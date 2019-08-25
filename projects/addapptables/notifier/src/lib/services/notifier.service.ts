import { Injectable, Injector, Inject } from '@angular/core';
import { NotifierPortalService } from './notifier-portal.service';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { NotifierComponent } from '../notifier.component';
import { DOCUMENT } from '@angular/common';
import { NotifierRef } from '../notifier-ref';
import { Notifier } from '../models/notifier.model';
import { NotifierConfiguration } from '../models/notifier-configuration.model';
import { ADDAPPTABLE_CONFIGURATION_NOTIFIER_DATA, ADDAPPTABLE_NOTIFIER_DATA } from '../tokens';
import { NotifierPositionType } from '../models/notifier-position-enum.model';
import { BottomRightStrategy } from '../strategies/bottom-right.strategy';
import { Strategy } from '../strategies/strategy';
import { TopRightStrategy } from '../strategies/top-right.strategy';
import { BottomLeftStrategy } from '../strategies/bottom-left.strategy';
import { TopLeftStrategy } from '../strategies/top-left.strategy';

@Injectable()
export class NotifierService {

  defaultConfiguration: NotifierConfiguration = {
    position: NotifierPositionType.bottomRight,
    timeout: 5000,
    classIcon: 'material-icons',
    iconValue: 'notifications'
  };

  constructor(
    private _notifierPortalService: NotifierPortalService,
    private _injector: Injector,
    @Inject(DOCUMENT) private _document: any,
    @Inject(ADDAPPTABLE_CONFIGURATION_NOTIFIER_DATA) configuration: NotifierConfiguration
  ) {
    this.defaultConfiguration = Object.assign(this.defaultConfiguration, configuration);
  }

  open(data: Notifier, configuration: NotifierConfiguration = <NotifierConfiguration>{}): NotifierRef {
    const portal = this._notifierPortalService.create();
    const componentPortal = this.createComponentPortal(data);
    const componentRef = portal.attach(componentPortal);
    const notifierRef = new NotifierRef(componentRef.instance, portal, this._document, this._notifierPortalService.getLastUniqueId);
    const mergeConfiguration = Object.assign(this.defaultConfiguration, configuration);
    this.factoryStrategy(mergeConfiguration).newNotifier(notifierRef);
    return notifierRef;
  }

  private factoryStrategy(configuration: NotifierConfiguration): Strategy {
    switch (configuration.position) {
      case NotifierPositionType.bottomRight:
        return this._injector.get(BottomRightStrategy);
      case NotifierPositionType.bottomLeft:
        return this._injector.get(BottomLeftStrategy);
      case NotifierPositionType.topLeft:
        return this._injector.get(TopLeftStrategy);
      case NotifierPositionType.topRight:
        return this._injector.get(TopRightStrategy);
      default:
        return this._injector.get(BottomRightStrategy);
    }
  }

  private createComponentPortal(data: any): ComponentPortal<NotifierComponent> {
    const injectionTokens = new WeakMap<any, any>([
      [ADDAPPTABLE_NOTIFIER_DATA, data]
    ]);
    const injector = new PortalInjector(this._injector, injectionTokens);
    return new ComponentPortal(NotifierComponent, null, injector);
  }
}
