import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { CompetitionDetailsState, selectCompetitionDetails } from '../store/reducers/competition-details.reducer';
import { CompetitionDetails } from '../store/models/competitionDetails';
import { Competition } from '../store/models/competition';
import { CurrentSeason } from '../store/models/currentSeason';
import { Standings } from '../store/models/standings';
import { StandingTeam } from '../store/models/standingTeam';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TeamDetailsDialog } from './team-details-dialog.component';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-competition-details',
  templateUrl: './competition-details.component.html',
  styleUrls: ['./competition-details.component.css']
})
export class CompetitionDetailsComponent implements OnInit, OnDestroy {
  headers = new HttpHeaders().append("X-Auth-Token", "d9b2c29baac94818a4908116a55d6f08");
  standings: StandingTeam[];
  competition:  Competition;//new Competition({ area: {}, currentSeason: {}});
  displayedColumns: string[] = ['Name', 
                                'Logo', 'position', 
                                'played', 'won', 
                                'draw', 'lost', 'points', 'goalsFavor', 'goalsAgainst', 'goalDifference'];
  compDetailSub: Subscription;


  constructor(private activatedRoute: ActivatedRoute, private store: Store<CompetitionDetailsState> ,
              private http: HttpClient, private dialog: MatDialog, 
              private router: Router) {
    this.compDetailSub = store.pipe(select(selectCompetitionDetails)).subscribe( //TODO: Unsubscribe On Destroy
      (competitionDet : CompetitionDetails) => {
        if (competitionDet) {
          this.standings = competitionDet.standings.table;
          this.competition = competitionDet.competition;
          this.competition.currentSeason = competitionDet.season
        }
      });
   }

  ngOnDestroy() {
    this.compDetailSub.unsubscribe();
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.performHttpRequest(`v2/competitions/${params['compId']}/standings?standingType=HOME`)
            .then((response: competitionDetailsResponse) => {
              if(response && response.standings && response.standings.length > 0) {
                this.store.dispatch({
                  type: 'SET_COMPETITION_DETAILS',
                  payload: {
                    competition: response.competition,
                    season: response.season,
                    standings: response.standings[0]
                  }
                });
              }
            });
    });
  }

  goBackToDashboard() {
    this.router.navigate(['main-menu']);
  }

  showTeamDetails(teamId) {
    const dialogRef = this.dialog.open(TeamDetailsDialog, {
      width: '700px',
      data: { teamId: teamId }
    });

    console.log(teamId);
  }

  //TODO: Handle this in a Service??
  performHttpRequest(resource) {
    return this.http.get(`https://api.football-data.org/${resource}`, //Filtered by Europe Area
                  { headers: this.headers })
                    .toPromise();
  }
}

export interface competitionDetailsResponse {
  competition: Competition;
  season: CurrentSeason;
  standings: Standings[];
}