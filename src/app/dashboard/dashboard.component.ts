import { Component, OnInit } from '@angular/core';
import { Competition } from '../store/models/competition';
import { CompetitionsState, selectCompetitions } from '../store/reducers/competitions.reducer';
import { CurrentSeason } from '../store/models/currentSeason';
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
    this.http.get('https://api.football-data.org/v2/competitions?areas=2077', //Filtered by Europe Area
                  { headers: this.headers }) //TODO: use config file to avoid full url
        .toPromise()
        .then((response : CompetitionsResponse) => {
            if (response && response.competitions) {
              this.store.dispatch({
                type: 'SET_COMPETITIONS',
                payload: response.competitions
              });
            }
        });
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
                     teamsNumber: '1', 
                     currentSeasonMatchDay: currentSeasonData.currentSeasonMatchday,
                     currentSeasonStartDate: currentSeasonData.currentSeasonStartDate, 
                     currentSeasonEndDate: currentSeasonData.currentSeasonEndDate };
          });

          this.cards.forEach((card) => console.log(card.title));
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
}

export interface CompetitionsResponse {
  competitions: Competition[]
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