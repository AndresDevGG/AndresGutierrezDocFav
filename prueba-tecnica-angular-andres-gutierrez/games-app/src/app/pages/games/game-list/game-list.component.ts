import { Component, OnInit } from '@angular/core';
import { OnSearchDto, SearchComponent } from '../../../components/general-components/search/search.component';

import { AppState } from '../../../store/core/app-state.model';
import { GameCardComponent } from '../../../components/game-components/game-card/game-card.component';
import { GameDto } from '../../../models/processes/game/game-dto';
import { GameService } from '../../../services/game/game.service';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { SubsManager } from '../../../core/utils/subs-manager';
import { TruncatePipe } from '../../../core/pipes/truncate.pipe';
import { gameRoot } from '../../../store/game-state/game-state.root';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [SearchComponent, GameCardComponent],
  templateUrl: './game-list.component.html',
  styleUrl: './game-list.component.scss'
})
export default class GameListComponent extends SubsManager implements OnInit {

  public games: Array<GameDto> = [];
  public filterGames: Array<GameDto> = [];

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {

    this.store.select(gameRoot.selectGames)
    .pipe(takeUntil(this.destroySubject))
    .subscribe(response => {
      if (response.length === 0) this.store.dispatch(gameRoot.GET_GAMES());
      this.games = response;
      this.filterGames = response;
    });

  }

  public onFilter(filter: OnSearchDto): void {
    this.filterGames = this.games.filter(x => {

      if (filter.name !== '' && !x.title.trim().toLowerCase().includes(filter.name.trim().toLowerCase())) {
        return false;
      }

      if (filter.gender !== '' && x.genre !== filter.gender) {
        return false;
      }

      if (filter.platform !== '' && x.platform !== filter.platform) {
        return false;
      }

      return true;

    });
  }
}
