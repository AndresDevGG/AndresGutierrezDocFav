import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { GameReducer } from './store/game-state/game-state.reducer';
import { gameRoot } from './store/game-state/game-state.root';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes, withComponentInputBinding()),
    provideStore({
      gameState: gameRoot.GameReducer
    }),
    provideEffects([
      gameRoot.GameEffects
    ]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
  ]
};
