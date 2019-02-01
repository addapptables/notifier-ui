import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotifierComponent } from './notifier.component';
import { MatButtonModule } from '@angular/material';
import { NotifierService } from './services/notifier.service';
import { NotifierPortalService } from './services/notifier-portal.service';
import { BottomRightStrategy } from './strategies/bottom-right.strategy';
import { ADDAPPTABLE_CONFIGURATION_NOTIFIER_DATA } from './tokens';
import { NotifierConfiguration } from './models/notifier-configuration.model';
import { NotifierPositionType } from './models/notifier-position-enum.model';
import { TopRightStrategy } from './strategies/top-right.strategy';
import { TopLeftStrategy } from './strategies/top-left.strategy';
import { BottomLeftStrategy } from './strategies/bottom-left.strategy';
import { AddapptablePerfectScrollbarModule } from '@addapptables/perfect-scrollbar';

@NgModule({
  declarations: [NotifierComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    AddapptablePerfectScrollbarModule
  ],
  entryComponents: [NotifierComponent],
  providers: [
    NotifierService,
    NotifierPortalService,
    BottomRightStrategy,
    TopRightStrategy,
    TopLeftStrategy,
    BottomLeftStrategy
  ]
})
export class NotifierModule {
  static forRoot(config: NotifierConfiguration = {
    position: NotifierPositionType.bottomRight,
    timeout: 5000,
    classIcon: 'material-icons',
    iconValue: 'notifications'
  }): ModuleWithProviders {
    return {
      ngModule: NotifierModule,
      providers: [
        { provide: ADDAPPTABLE_CONFIGURATION_NOTIFIER_DATA, useValue: config }
      ]
    };
  }
}
