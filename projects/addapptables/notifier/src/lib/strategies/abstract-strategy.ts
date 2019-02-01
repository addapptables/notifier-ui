import { Inject, OnDestroy } from '@angular/core';
import { NotifierRef } from '../notifier-ref';
import { DOCUMENT } from '@angular/common';
import { take } from 'rxjs/operators';
import { Strategy } from './strategy';

export abstract class AbstractStrategy implements Strategy, OnDestroy {
    notifiers: NotifierRef[] = [];

    margin = 30;

    maxNotifiers = 5;

    constructor(@Inject(DOCUMENT) private _document: HTMLDocument) {
        this.notifiers = [];
    }

    newNotifier(notifierRef: NotifierRef) {
        notifierRef.afterClosed().pipe(take(1)).subscribe(this.deletePortal.bind(this));
        notifierRef.changedStyle(this.getStyleNewNotifier(notifierRef));
        setTimeout(() => {
            if (this.notifiers.length >= this.maxNotifiers) {
                const notifier = this.notifiers.shift();
                notifier.close();
            }
            const element = this._document.querySelector(`#${notifierRef.component._id} > addapptable-notifier > .addapptable-notifier`);
            this.notifiers.forEach(notifier => {
                const elementNotifier = this._document
                    .querySelector<HTMLDivElement>(`#${notifier.component._id} > addapptable-notifier > .addapptable-notifier`);
                notifier.changedStyle(this.getStyleNotifierPosition(elementNotifier, element.clientHeight));
            });
            this.notifiers.push(notifierRef);
        });
    }

    protected abstract getStyleNewNotifier(notifierRef: NotifierRef);

    protected abstract getStyleNotifierPosition(divNotifier: HTMLDivElement, clientHeight: number);

    private deletePortal(id: string) {
        const notifier = this.notifiers.findIndex(x => x.component._id === id);
        if (notifier >= 0) {
            const element = this._document
                .querySelector<HTMLDivElement>(`#${this.notifiers[notifier].component._id} > addapptable-notifier > .addapptable-notifier`);
            const clientHeightElementDelete = element.clientHeight;
            this.notifiers.splice(notifier, 1);
            for (let index = notifier - 1; index >= 0; index--) {
                const notifierStyle = this.notifiers[index];
                const elementChange = this._document
                    .querySelector<HTMLDivElement>(`#${notifierStyle.component._id} > addapptable-notifier > .addapptable-notifier`);
                notifierStyle.changedStyle(this.getStyleDeleteNotifier(elementChange, clientHeightElementDelete));
            }
        }
    }

    protected abstract getStyleDeleteNotifier(elementChange: HTMLDivElement, clientHeightElementDelete: number);

    ngOnDestroy(): void {
        this.notifiers.forEach(notifier => {
            notifier.close();
        });
    }
}
