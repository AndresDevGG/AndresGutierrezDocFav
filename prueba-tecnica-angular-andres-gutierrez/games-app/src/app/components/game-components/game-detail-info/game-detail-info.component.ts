import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CarouselModule } from 'primeng/carousel';
import { GameDetailDto } from '../../../models/processes/game/game-detail-dto';
import { ReadMoreComponent } from '../../general-components/read-more/read-more.component';

@Component({
  selector: 'app-game-detail-info',
  standalone: true,
  imports: [ReadMoreComponent, CarouselModule],
  templateUrl: './game-detail-info.component.html',
  styleUrl: './game-detail-info.component.scss'
})
export class GameDetailInfoComponent implements OnChanges {

  @Input() game: GameDetailDto = null;
  public responsiveOptions: any[] | undefined;
  public urlVideo: string = '';
  public showVideo: boolean = true;
  constructor() {
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.showVideo = false;
    this.urlVideo = `https://www.freetogame.com/g/${this.game?.id}/videoplayback.webm`;
    setTimeout(() => {
      this.showVideo = true;
    }, 10);
  }
}
