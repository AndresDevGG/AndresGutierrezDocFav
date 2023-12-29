import { GameDetailDto } from "../../models/processes/game/game-detail-dto";
import { GameDto } from "../../models/processes/game/game-dto";

export interface GameState {
  games: Array<GameDto>;
  gameDetail: GameDetailDto;
  genders: Array<string>;
  platforms: Array<string>;
  showSpinner: boolean;
}
