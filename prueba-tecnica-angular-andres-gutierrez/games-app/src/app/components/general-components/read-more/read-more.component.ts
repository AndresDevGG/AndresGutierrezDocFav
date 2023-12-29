import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-read-more',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './read-more.component.html',
  styleUrl: './read-more.component.scss'
})
export class ReadMoreComponent {

  @Input() text: string;
  @Input() maxLength: number = 100;
  showReadMore: boolean = true;

  toggleReadMore() {
    this.showReadMore = !this.showReadMore;
  }
}
