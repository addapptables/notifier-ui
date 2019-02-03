# ADDAPPTABLES notifier

ADDAPPTABLES notifier is a library for angular

[See demo](http://addapptables.com/admin/components/notifiers)

[Example code](https://stackblitz.com/edit/angular-notifier)

## Getting Started
To get started, let's install the package through npm:

```
npm i @addapptables/notifier --S
```

Install peer dependencies

```
npm i
@addapptables/core
@angular/material
@angular/cdk
@angular/animations --S
```

## How to use

- Import the module NotifierModule into the AppModule

```typescript
import { NotifierModule } from '@addapptables/notifier';
@NgModule({
  imports: [
    NotifierModule.forRoot() ,
    // options
    /*NotifierModule.forRoot({
      position: NotifierPositionType.bottomRight,
      timeout: 5000,
      classIcon: 'material-icons',
      iconValue: 'notifications'
    })*/
  ]
})
export class AppModule { }
```

- Import the module NotifierModule into the ChildModule

```typescript
import { NotifierModule } from '@addapptables/notifier';
@NgModule({
  imports: [NotifierModule],
  declarations: [NotifierComponent]
})
export class ChildModule { }
```

- Create a component an inject NotifierService

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

- Notifier type options

```typescript
export enum NotifierType {
    primary,
    accent,
    success,
    warning,
    danger,
    info
}
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
import { NotifierModule } from '@addapptables/notifier';
@NgModule({
  imports: [
    //...,
    NotifierModule
  ],
  declarations: [NotifierCustomComponent, NotifierCustomSuccessComponent],
  entryComponents: [
    NotifierCustomComponent // important this line
  ]
})
export class ChildModuleModule { }
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

## Import css

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
    @include angular-material-theme($addapptable-app-theme);
    @include addapptable-notifier($addapptable-app-theme, $addapptable-theme-variables);
}
```

- Do not forget to put the theme-default class in the html body

```html
<body class="theme-default"></body>
```