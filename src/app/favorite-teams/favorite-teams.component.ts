import { Component, OnInit, OnDestroy } from '@angular/core';
import { FavoriteTeamsState, selectFavoriteTeams } from '../store/reducers/favorite-teams.reducer';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FavoriteTeams } from '../store/models/favoriteTeams';
import { MatDialog } from '@angular/material/dialog';
import { NextMatchDialog } from './next-match-dialog.component';

@Component({
  selector: 'app-favorite-teams',
  templateUrl: './favorite-teams.component.html',
  styleUrls: ['./favorite-teams.component.css']
})
export class FavoriteTeamsComponent implements OnInit, OnDestroy {
  favoriteTeamsSubscribe: Subscription
  favoriteTeamsColumns: string[] = ['team', 'crest', 'moreInfo'];
  favoriteTeams: FavoriteTeams;

  constructor(private store: Store<FavoriteTeamsState>, private dialog: MatDialog) {
    this.favoriteTeamsSubscribe = 
            store.pipe(select(selectFavoriteTeams)).subscribe(
                (favTeams: FavoriteTeams) => {
                    if (favTeams) {
                      this.favoriteTeams = favTeams;
                    }
                });
  }

  ngOnInit() {}

  ngOnDestroy() {}

  showNextMatchInfo(id) {
    const dialogRef = this.dialog.open(NextMatchDialog, {
      width: '300px',
      data: { teamId: id }
    });
  }

}
