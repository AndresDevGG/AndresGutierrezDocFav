import { GameDetailDto } from "../../models/processes/game/game-detail-dto";
import { GameDto } from "../../models/processes/game/game-dto";
import { GameState } from "./game-state.model";
import { createSelector } from "@ngrx/store";

const getGames = (state: GameState): Array<GameDto> => state.games;
const getGame = (state: GameState): GameDetailDto => state.gameDetail;
const getSpinnerInfo = (state: GameState): boolean => state.showSpinner;
const getGenders = (state: GameState): Array<string> => state.genders;
const getPlatforms = (state: GameState): Array<string> => state.platforms;

const selectGames = createSelector((state: { gameState: GameState }) => state.gameState, getGames);
const selectGame = createSelector((state: { gameState: GameState }) => state.gameState, getGame);
const selectSpinner = createSelector((state: { gameState: GameState }) => state.gameState, getSpinnerInfo);
const selectGenders = createSelector((state: { gameState: GameState }) => state.gameState, getGenders);
const selectPlatforms = createSelector((state: { gameState: GameState }) => state.gameState, getPlatforms);

const selectFilters = createSelector(
  selectGenders,
  selectPlatforms,
  (genders, platforms) => {
    return {
      genders,
      platforms,
    };
  }
)

export { selectGames, selectGame, selectSpinner, selectFilters};
