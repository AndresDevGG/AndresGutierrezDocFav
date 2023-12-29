import {
  GET_GAME,
  GET_GAMES,
  HIDE_SPINNER,
  SHOW_SPINNER
} from './game-state.actions'
import { selectFilters, selectGame, selectGames, selectSpinner } from './game-state.selects';

import { GameEffects } from './game-state.effects';
import { GameReducer } from './game-state.reducer';

export const gameRoot = {
  GET_GAMES,
  GET_GAME,
  SHOW_SPINNER,
  HIDE_SPINNER,
  GameReducer,
  GameEffects,
  selectGames,
  selectGame,
  selectFilters,
  selectSpinner
};
