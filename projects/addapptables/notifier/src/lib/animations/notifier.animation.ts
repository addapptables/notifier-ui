import { style, trigger, transition, animate, keyframes, AnimationTriggerMetadata } from '@angular/animations';

export const slideInDown = [
    style({
        transform: 'translate3d(0,-100%, 0)',
        visibility: 'visible',
        offset: 0
    }),
    style({
        transform: 'translate3d(0, 0, 0)',
        offset: 1
    })
];

export const zoomOut = [
    style({
        opacity: 1,
        offset: 0
    }),
    style({
        transform: 'scale3d(0.3, 0.3, 0.3)',
        offset: .5
    }),
    style({
        opacity: 0,
        offset: 1
    })
];

export const slideInUp = [
    style({
        transform: 'translate3d(0, 100%, 0)',
        visibility: 'visible',
        offset: 0
    }),
    style({
        transform: 'translate3d(0, 0, 0)',
        offset: 1
    })
];

export const notifierAnimation: {
    readonly notifierAnimator: AnimationTriggerMetadata;
} = {
    notifierAnimator: notifierTriggerAnimation()
};

export function notifierTriggerAnimation() {
    return trigger('notifierAnimator', [
        transition('* => slideInUp', animate(150, keyframes(slideInUp))),
        transition('* => slideInDown', animate(150, keyframes(slideInDown))),
        transition('* => exit', animate(150, keyframes(zoomOut)))
    ]);
}


