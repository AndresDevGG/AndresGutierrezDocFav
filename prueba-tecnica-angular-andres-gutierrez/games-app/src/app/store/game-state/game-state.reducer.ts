import * as Actions from "./game-state.actions";

import { createReducer, on, props } from "@ngrx/store";

import { GameState } from "./game-state.model";

const initialState: GameState = {
  games: [],
  genders: [],
  platforms: [],
  gameDetail: null,
  showSpinner: false
};

export const GameReducer = createReducer(
  initialState,
  on(Actions.GET_GAMES_SUCCESS, (state, action) => ({ ...state, games: action.data})),
  on(Actions.GET_GAME_SUCCESS, (state, action) => ({ ...state, gameDetail: action.data})),
  on(Actions.SET_GENDERS, (state, action) => ({ ...state, genders: action.data})),
  on(Actions.SET_PLATFORMS, (state, action) => ({ ...state, platforms: action.data})),
  on(Actions.SHOW_SPINNER, (state, action) => ({ ...state, show: true})),
  on(Actions.HIDE_SPINNER, (state, action) => ({ ...state, show: false}))
);
