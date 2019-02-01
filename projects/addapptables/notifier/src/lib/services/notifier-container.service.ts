import { Injectable, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NOTIFIER_CONTAINER } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class NotifierContainerService implements OnDestroy {

  protected _containerElement: HTMLElement;

  constructor(@Inject(DOCUMENT) protected _document: any) { }

  getContainerElement(): HTMLElement {
    if (!this._containerElement) { this._createContainer(); }
    return this._containerElement;
  }

  protected _createContainer(): void {
    const container = this._document.createElement('div');
    container.classList.add(NOTIFIER_CONTAINER);
    this._document.body.appendChild(container);
    this._containerElement = container;
  }

  ngOnDestroy() {
    if (this._containerElement && this._containerElement.parentNode) {
      this._containerElement.parentNode.removeChild(this._containerElement);
    }
  }
}
