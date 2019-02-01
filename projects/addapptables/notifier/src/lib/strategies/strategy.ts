import { NotifierRef } from '../notifier-ref';

export interface Strategy {
    newNotifier(notifierRef: NotifierRef);
}
