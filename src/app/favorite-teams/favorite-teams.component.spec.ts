import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteTeamsComponent } from './favorite-teams.component';

describe('FavoriteTeamsComponent', () => {
  let component: FavoriteTeamsComponent;
  let fixture: ComponentFixture<FavoriteTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
