import {animate, style, transition, trigger} from "@angular/animations";

const enterTransition = transition(':enter', [
  style({ opacity: 0 }),
  animate('0.5s ease-in', style({ opacity: 1 }))
])

export const fadeIn = trigger('fadeIn', [enterTransition]);
