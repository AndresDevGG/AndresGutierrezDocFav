import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameDetailInfoComponent } from './game-detail-info.component';

describe('GameDetailInfoComponent', () => {
  let component: GameDetailInfoComponent;
  let fixture: ComponentFixture<GameDetailInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameDetailInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameDetailInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
