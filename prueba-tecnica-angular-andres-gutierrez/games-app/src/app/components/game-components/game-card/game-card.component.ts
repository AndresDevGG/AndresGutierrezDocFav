import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { GameDto } from '../../../models/processes/game/game-dto';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '../../../core/pipes/truncate.pipe';

@Component({
  selector: 'app-game-card',
  standalone: true,
  imports: [TruncatePipe, RouterModule],
  templateUrl: './game-card.component.html',
  styleUrl: './game-card.component.scss'
})
export class GameCardComponent {
  @Input() game: GameDto = null;
}
