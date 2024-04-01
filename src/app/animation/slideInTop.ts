import {animate, style, transition, trigger} from "@angular/animations";

const enterTransition = transition(':enter', [
  style({ transform: 'translateY(-100%)' }),
  animate('500ms ease-out', style({ transform: 'translateY(0)' })),
])

export const slideInTop = trigger('slideInTop', [enterTransition]);
