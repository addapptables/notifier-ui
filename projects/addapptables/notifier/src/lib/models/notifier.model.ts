import { NotifierType } from './notifier-type.model';
import { TemplateRef } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';

export class Notifier<D = any, T = any> {
    message: string;
    type: NotifierType;
    data?: D;
    templateOrComponent?: ComponentType<T> | TemplateRef<T>;
}
