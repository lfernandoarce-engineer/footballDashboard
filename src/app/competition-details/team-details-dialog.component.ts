import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Teams } from '../store/models/teams';
import { TeamDetailsState, selectTeamDetails } from '../store/reducers/team-details.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { TeamPlayer } from '../store/models/teamPlayer';
import { FavoriteTeamsState, selectFavoriteTeams } from '../store/reducers/favorite-teams.reducer';
import { FavoriteTeams } from '../store/models/favoriteTeams';

@Component({
    selector: 'team-details-dialog',
    templateUrl: 'team-details-dialog.html',
  })
export class TeamDetailsDialog implements OnDestroy {
    headers = new HttpHeaders().append("X-Auth-Token", "d9b2c29baac94818a4908116a55d6f08");
    isOnFavorites: boolean;
    team: Teams;
    teamDetailsSubscribe: Subscription;
    favoriteTeamsSubscribe: Subscription;
    teamPlayersColumns: string[] = ['player', 'position', 'nationality', 'age'];
    
    //TODO: Handle this in a Service??
    performHttpRequest(resource) {
        return this.http.get(`https://api.football-data.org/${resource}`, //Filtered by Europe Area
                        { headers: this.headers })
                        .toPromise();
    }

constructor(
    public dialogRef: MatDialogRef<TeamDetailsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpClient, 
                             private store: Store<TeamDetailsState>, 
                             private favoritesStore: Store<FavoriteTeamsState>) {
        this.teamDetailsSubscribe = 
            store.pipe(select(selectTeamDetails)).subscribe(
                (teamDetails: Teams) => {
                    if (teamDetails) {
                        this.team = teamDetails;
                    }   
                });
        
        this.favoriteTeamsSubscribe = 
            favoritesStore.pipe(select(selectFavoriteTeams)).subscribe(
                    (favTeams: FavoriteTeams) => {
                        if (favTeams && this.data) {
                            this.isOnFavorites = favTeams.teams.find((t) => t.id === this.data.teamId) != null ? true: false;
                        }
                    });
    }

    ngOnInit() {
        this.performHttpRequest(`v2/teams/${this.data.teamId}`)
                .then((response: Teams) => {
                    if (response) {
                        response.squad = response.squad.map((player) => {
                                            player.age = moment().diff(player.dateOfBirth, 'years');                                                
                                            return player;
                                        });

                        this.store.dispatch({
                            type: 'SET_TEAM_DETAILS',
                            payload: response
                        });

                    }
                });
    }

    ngOnDestroy(){
        this.teamDetailsSubscribe.unsubscribe();
        this.store.dispatch({
            type: 'SET_TEAM_DETAILS',
            payload: {}
        });
    }

    setTeamFavorite(event) {
        let type = event.checked ? 'ADD_FAVORITE_TEAM': 'REMOVE_FAVORITE_TEAM';
        let payload =  event.checked ? this.team: { teamId: this.team.id}; 
        
        this.favoritesStore.dispatch({
            type: type,
            payload: payload
        });
    }
}

export interface DialogData {
    teamId: number
}