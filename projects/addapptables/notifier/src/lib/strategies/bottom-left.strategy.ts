import { Injectable } from '@angular/core';
import { AbstractStrategy } from './abstract-strategy';
import { NotifierRef } from '../notifier-ref';

@Injectable()
export class BottomLeftStrategy extends AbstractStrategy {

    protected getStyleNewNotifier(notifierRef: NotifierRef) {
        notifierRef.component._state = 'slideInUp';
        return { bottom: `0px`, left: '0px' };
    }

    protected getStyleNotifierPosition(divNotifier: HTMLDivElement, clientHeight: number) {
        const lastValueBottom = Number(divNotifier.style.bottom.replace('px', ''));
        return { bottom: `${clientHeight + lastValueBottom + this.margin}px`, left: '0px' };
    }

    protected getStyleDeleteNotifier(elementChange: HTMLDivElement, clientHeightElementDelete: number) {
        const valueBottomChange = Number(elementChange.style.bottom.replace('px', ''));
        return { bottom: `${valueBottomChange - clientHeightElementDelete - this.margin}px`, left: '0px' };
    }
}
