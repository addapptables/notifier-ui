import {
  Component,
  ChangeDetectionStrategy,
  EventEmitter,
  AfterViewInit,
  HostListener,
  OnDestroy,
  Inject,
  ViewEncapsulation,
  Injector,
  TemplateRef,
  ViewContainerRef,
  ComponentFactoryResolver,
  ViewChild,
  OnInit
} from '@angular/core';
import { notifierAnimation } from './animations/notifier.animation';
import { AnimationEvent } from '@angular/animations';
import { interval, Subject } from 'rxjs';
import { take, tap, takeUntil } from 'rxjs/operators';
import { ADDAPPTABLE_CONFIGURATION_NOTIFIER_DATA, ADDAPPTABLE_NOTIFIER_DATA } from './tokens';
import { NotifierConfiguration } from './models/notifier-configuration.model';
import { Notifier } from './models/notifier.model';
import { PortalInjector, ComponentType } from '@angular/cdk/portal';
import { DynamicDirective } from '@addapptables/core';

@Component({
  selector: 'addapptable-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
  animations: [notifierAnimation.notifierAnimator],
  encapsulation: ViewEncapsulation.None
})
export class NotifierComponent implements OnInit, AfterViewInit, OnDestroy {

  _id: string;

  _state: 'slideInUp' | 'exit' | 'slideInDown' = 'slideInUp';

  _close = new EventEmitter();

  _animationStateChanged = new EventEmitter<AnimationEvent>();

  _style = {};

  subject = new Subject<void>();

  seconds = interval(5000);

  @ViewChild(DynamicDirective)
  appDynamic: DynamicDirective;

  constructor(
    @Inject(ADDAPPTABLE_CONFIGURATION_NOTIFIER_DATA) public configuration: NotifierConfiguration,
    @Inject(ADDAPPTABLE_NOTIFIER_DATA) public data: Notifier,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.seconds = interval(configuration.timeout);
  }

  ngOnInit(): void {
    if (this.data.templateOrComponent) {
      this.resolveComponent(this.data.templateOrComponent, this.appDynamic.viewContainerRef);
    }
  }

  ngAfterViewInit(): void {
    this._timeOut();
  }

  @HostListener('mouseover') onMouseOver() {
    this.subject.next();
    this.subject.complete();
  }


  @HostListener('mouseleave') onMouseLeave() {
    this.subject = new Subject<void>();
    this._timeOut();
  }

  private _timeOut() {
    this.seconds.pipe(
      takeUntil(this.subject),
      take(1),
      tap(() => this.close())
    ).subscribe();
  }

  close() {
    this._close.emit();
  }

  startExitAnimation(): void {
    this._state = 'exit';
  }

  private resolveComponent(component: ComponentType<{}> | TemplateRef<{}>, viewContainerRef: ViewContainerRef) {
    if (!component) { return; }
    viewContainerRef.clear();
    if (component instanceof TemplateRef) {
      viewContainerRef.createEmbeddedView(component, { $implicit: this.data });
    } else {
      const componentFactory = component && this.componentFactoryResolver.resolveComponentFactory(component);
      const injector = this.createInjector(viewContainerRef.injector);
      viewContainerRef.createComponent(componentFactory, null, injector);
    }
  }

  private createInjector(injector: Injector): PortalInjector {
    const injectionTokens = new WeakMap<any, any>([
      [ADDAPPTABLE_NOTIFIER_DATA, this.data]
    ]);
    return new PortalInjector(injector, injectionTokens);
  }

  ngOnDestroy(): void {
    this.subject.next();
    this.subject.complete();
  }
}
