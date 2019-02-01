# ADDAPPTABLES notifier

[See demo](http://addapptables.com/admin/components/notifiers)

## Getting Started
To get started, lets install the package thru npm:

```
npm i @addapptables/notifier --S
```

Install peer dependencies

```
npm i
@addapptables/perfect-scrollbar
perfect-scrollbar
@angular/material
@angular/cdk
@angular/animations --S
```

## How to use

```typescript
import { NotifierModule } from '@addapptables/notifier';
@NgModule({
  imports: [NotifierModule.forRoot()]
})
export class AppModule { }
```

```typescript
import { NotifierModule } from '@addapptables/notifier';
@NgModule({
  imports: [NotifierModule],
  declarations: [NotifierComponent]
})
export class ChildModuleModule { }
```

```typescript
@Component(// ...)
export class NotifierComponent {

  constructor(private notifierService: NotifierService) { }

  openNotifier() {
    this.notifierService.open({
      type: NotifierType.success,
      message: 'Notifier success'
    });
  }
}
```

```html
    <button type="button" mat-raised-button color="primary" (click)="openNotifier()">Notifier success</button>
```

## Custom notifier

```typescript
@Component(// ...)
export class NotifierCustomComponent {
  constructor(@Inject(ADDAPPTABLE_NOTIFIER_DATA) public notifier: Notifier) {
    console.log(notifier);
  }
}
```

```html
    <span class="notifier-custom">
        <mat-icon suffix *ngIf="notifier.data?.icon">{{notifier.data.icon}}</mat-icon> {{notifier.message}}
    </span>
```

```typescript
@Component(// ...)
export class NotifierCustomSuccessComponent {

  constructor(private notifierService: NotifierService) { }

  openNotifier() {
    this.notifierService.open({
      type: NotifierType.success,
      message: 'Custom notifier success',
      templateOrComponent: NotifierCustomComponent,
      data: {
        icon: 'done'
      }
    });
  }
}
```

```typescript
import { NotifierModule } from '@addapptables/notifier';
@NgModule({
  imports: [
    //...,
    NotifierModule
  ],
  declarations: [NotifierCustomComponent, NotifierCustomSuccessComponent],
  entryComponents: [NotifierCustomComponent]
})
export class ChildModuleModule { }
```

## Custom css

```scss
@import '~@angular/material/theming';
@import '~@addapptables/notifier/_addapptables-notifier.theme';

$addapptable-app-primary: mat-palette($mat-teal, 800);
$addapptable-app-accent:  mat-palette($mat-pink, 800, A100, 100);
$addapptable-app-warn: mat-palette($mat-red);
$addapptable-app-theme: mat-light-theme($addapptable-app-primary, $addapptable-app-accent, $addapptable-app-warn);
$addapptable-theme-variables: (
    color-info: #20a9d2,
    color-success: #5cb85c,
    color-danger: #d43934,
    color-warning: #e09d3d
);

@include mat-core();
body.theme-default {
    @include addapptable-notifier($addapptable-app-theme, $addapptable-theme-variables);
}
```