import { NotifierPositionType } from './notifier-position-enum.model';

export class NotifierConfiguration {
    position: NotifierPositionType;
    iconValue?: string;
    classIcon?: string;
    timeout?: number;
}
