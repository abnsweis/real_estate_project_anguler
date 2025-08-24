import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { ConfirmationService, MessageService } from 'primeng/api';
import Lara from '@primeuix/themes/lara';
import { provideToastr } from 'ngx-toastr';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';
import { errorInterceptor } from './core/interceptors/errorInterceptor';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        loadingInterceptor,
        errorInterceptor,
        authInterceptor
      ]),
    ),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Lara,
        options: {
          darkModeSelector: false,

        }

      }
    }),
    ConfirmationService,
    MessageService,
    provideToastr(),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyBGPmgCIOmqJGKhPkCWePZJNPu578cctKU",
      authDomain: "realestate-4a97f.firebaseapp.com",
      projectId: "realestate-4a97f",
      storageBucket: "realestate-4a97f.firebasestorage.app",
      messagingSenderId: "629187277017",
      appId: "1:629187277017:web:88133b4f92642ccacf4ec8",
      measurementId: "G-S99CQVCY8P"
    })),
    provideAuth(() => getAuth())
  ]
};
