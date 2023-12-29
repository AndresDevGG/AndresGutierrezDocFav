import { createAction, props } from '@ngrx/store';

import { GameDetailDto } from '../../models/processes/game/game-detail-dto';
import { GameDto } from '../../models/processes/game/game-dto';

const GET_GAMES = createAction('[GAME] Get Games');
const GET_GAMES_SUCCESS = createAction('[GAME] Get Games Success', props<{data: Array<GameDto>}>());
const GET_GAMES_ERROR = createAction('[GAME] Get Games Error');

const GET_GAME = createAction('[GAME] Get Game', props<{id: number}>());
const GET_GAME_SUCCESS = createAction('[GAME] Get Game Success', props<{data: GameDetailDto}>());
const GET_GAME_ERROR = createAction('[GAME] Get Game Error');

const SET_GENDERS = createAction('[GAME] Set Genders', props<{data: Array<string>}>());
const SET_PLATFORMS = createAction('[GAME] Set Platforms', props<{data: Array<string>}>());

const SHOW_SPINNER = createAction('[SPINNER] Show Spinner');
const HIDE_SPINNER = createAction('[SPINNER] Hide Spinner');


export {
  GET_GAMES,
  GET_GAMES_SUCCESS,
  GET_GAMES_ERROR,
  GET_GAME,
  GET_GAME_SUCCESS,
  GET_GAME_ERROR,
  SET_GENDERS,
  SET_PLATFORMS,
  SHOW_SPINNER,
  HIDE_SPINNER
};
