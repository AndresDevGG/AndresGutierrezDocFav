import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { AppState } from '../../../store/core/app-state.model';
import { GameDetailDto } from './../../../models/processes/game/game-detail-dto';
import { GameDetailInfoComponent } from '../../../components/game-components/game-detail-info/game-detail-info.component';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { SubsManager } from '../../../core/utils/subs-manager';
import { gameRoot } from '../../../store/game-state/game-state.root';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [GameDetailInfoComponent],
  templateUrl: './game-detail.component.html',
  styleUrl: './game-detail.component.scss'
})
export default class GameDetailComponent extends SubsManager implements OnInit {

  @Input('id') id: number = null;
  public game: GameDetailDto = null;


  constructor(private store: Store<AppState>, private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(gameRoot.GET_GAME({id: this.id}));
    this.store.select(gameRoot.selectGame)
    .pipe(takeUntil(this.destroySubject))
    .subscribe(response => {
      this.game = response;
    })

  }

  goBack() {
    this.store.dispatch(gameRoot.GET_GAME_SUCCESS({data: null}));
    this.router.navigateByUrl('/games')
  }

  override ngOnDestroy() {
    this.destroySubject.next();

  }

}
