import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { enrolmentReducer } from './enrolment.store';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore({ enrolment: enrolmentReducer })
  ]
};
