import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { AppState } from '../../../store/core/app-state.model';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { SubsManager } from '../../../core/utils/subs-manager';
import { gameRoot } from '../../../store/game-state/game-state.root';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent extends SubsManager implements OnInit {

  public genders: Array<string> = [];
  public platforms: Array<string> = [];

  public formFilter: FormGroup;

  @Output() onSearch: EventEmitter<OnSearchDto> = new EventEmitter<OnSearchDto>();

  constructor(private store: Store<AppState>) {
    super();
  }

  ngOnInit(): void {

    this.initForm();

    this.store.select(gameRoot.selectFilters)
    .pipe(takeUntil(this.destroySubject))
    .subscribe(response => {
      this.genders = response.genders;
      this.platforms = response.platforms;
    });

    this.formFilter.valueChanges
    .pipe(takeUntil(this.destroySubject))
    .subscribe(changes => {
      this.search();
    });

  }

  public initForm(emit: boolean = false): void {
    this.formFilter = new FormGroup({
      name: new FormControl(''),
      gender: new FormControl(''),
      platform: new FormControl('')
    });

    if(emit) this.search();

  }

  public search(): void {
    this.onSearch.emit(this.formFilter.value);

  }

}

export interface OnSearchDto {
  name: string;
  gender: string;
  platform: string;
}
