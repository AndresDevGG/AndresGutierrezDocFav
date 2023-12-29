import * as GameActions from './game-state.actions'

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, forkJoin, lastValueFrom, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { finished, inProcess, inQueue } from '../../core/utils/actions-proccess';

import { AppState } from '../core/app-state.model';
import { GameService } from '../../services/game/game.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class GameEffects {

  private _idEvolutionStore: string = '';

  constructor(
    private actions$: Actions,
    private gameService: GameService,
    private store: Store<AppState>
  ) {
  }

  getGamesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.GET_GAMES),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this.gameService.getAll()
        .pipe(
          mergeMap(response => {
            if (response) {

              const genders = Array.from(new Set(response.map(x => x.genre)));
              const platforms =  Array.from(new Set(response.map(x => x.platform)));

              return [GameActions.GET_GAMES_SUCCESS({data: response}), GameActions.SET_GENDERS({data: genders}), GameActions.SET_PLATFORMS({data: platforms})]
            } else {
              return [GameActions.GET_GAMES_ERROR()]
            }
          }),
          catchError(error => of(GameActions.GET_GAMES_ERROR())),
          tap((action) => finished(action.type))
        );
      })
    );
  });

  getGameByIdEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GameActions.GET_GAME),
      tap((action) => inQueue(action.type)),
      mergeMap((action) => {
        inProcess(action.type);
        return this.gameService.getById(action.id)
        .pipe(
          mergeMap(response => {
            if (response) {
              return [GameActions.GET_GAME_SUCCESS({data: response})]
            } else {
              return [GameActions.GET_GAME_ERROR()]
            }
          }),
          catchError(error => of(GameActions.GET_GAME_ERROR())),
          tap(() => finished(action.type))
        );
      })
    );
  });

}
