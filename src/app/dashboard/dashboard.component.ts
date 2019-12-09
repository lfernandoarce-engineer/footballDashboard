import { Component, OnInit } from '@angular/core';
import { CompetitionsState, selectCompetitions } from '../store/reducers/competitions.reducer';
import { CurrentSeason } from '../store/models/currentSeason';
import { CompetitionsResponse, CompetitionTeamsResponse } from '../dtos';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  headers = new HttpHeaders().append("X-Auth-Token", "d9b2c29baac94818a4908116a55d6f08");
  cards: CardData[];

  ngOnInit() {
    this.performHttpRequest('v2/competitions?areas=2077&plan=TIER_ONE') //Filtered by Europe Area and free account  
        .then((response : CompetitionsResponse) => {
            if (response && response.competitions) {
              this.store.dispatch({
                type: 'SET_COMPETITIONS',
                payload: response.competitions
              });

              response.competitions.forEach((comp) => this.getCompetitionTeamsDetails(comp.id));
            }
        });
  }

  getCompetitionTeamsDetails(compId) {
    this.performHttpRequest(`v2/competitions/${compId}/teams`)
        .then((response : CompetitionTeamsResponse) => {
            if(response && response.teams) {
              this.store.dispatch({
                type: 'SET_COMPETITION_TEAMS',
                payload: {compId: compId, teams: response.teams, teamsNumber: response.count}
              });
            }
        });
  }

  getCurrentSeasonData(currentSeason : CurrentSeason) {
    return  {
      currentSeasonMatchday: currentSeason && currentSeason.currentMatchday ? currentSeason.currentMatchday: 'NA',
      currentSeasonStartDate: currentSeason && currentSeason.startDate ? currentSeason.startDate: 'NA',
      currentSeasonEndDate: currentSeason && currentSeason.endDate ? currentSeason.endDate: 'NA'   
    }
  }

  performHttpRequest(resource) {
    return this.http.get(`https://api.football-data.org/${resource}`, //Filtered by Europe Area
                  { headers: this.headers })
                    .toPromise();
  }

  constructor(private http: HttpClient, private store: Store<CompetitionsState>) {
    store.pipe(select(selectCompetitions)).subscribe( //TODO: Unsubscribe On Destroy
      (competitions : CompetitionsState) => {
        if (competitions && (competitions instanceof Array)) {
          this.cards = competitions.map((comp) => {
            let currentSeasonData = this.getCurrentSeasonData(comp.currentSeason);

            return { 
                     id: comp.id,
                     title: comp.name, 
                     area: comp.area ? comp.area.name: 'NA', 
                     teamsNumber: comp.teamsNumber, //TODO: exist other ways to get teams list for a competition?
                     currentSeasonMatchDay: currentSeasonData.currentSeasonMatchday,
                     currentSeasonStartDate: currentSeasonData.currentSeasonStartDate, 
                     currentSeasonEndDate: currentSeasonData.currentSeasonEndDate };
            });
        }
      });
    }
}

export interface CardData {
  id: number,
  title: string
  area: string, 
  teamsNumber: string, 
  currentSeasonMatchDay: string, 
  currentSeasonStartDate: string, 
  currentSeasonEndDate: string
}