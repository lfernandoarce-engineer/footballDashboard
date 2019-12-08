import { Component, OnInit } from '@angular/core';
import { Competition } from '../store/models/competition';
import { CompetitionsState, selectCompetitions } from '../store/reducers/competitions.reducer';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

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

  constructor(private http: HttpClient, private store: Store<CompetitionsState>, private breakpointObserver: BreakpointObserver) {
    store.pipe(select(selectCompetitions)).subscribe( //TODO: Unsubscribe On Destroy
      (competitions : CompetitionsState) => {
        if (competitions && (competitions instanceof Array)) {
          this.cards = competitions.map((comp) => {
            return { title: comp.name, cols: 1, rows: 1};
          });

          this.cards.forEach((card) => console.log(card.title));
        }
      });
    }
}

export interface CompetitionsResponse {
  competitions: Competition[]
}

export interface CardData {
  title: string
}

/** Based on the screen size, switch from standard to one column per row */
  // cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { title: 'Card 1', cols: 1, rows: 1 },
  //         { title: 'Card 2', cols: 1, rows: 1 },
  //         { title: 'Card 3', cols: 1, rows: 1 },
  //         { title: 'Card 4', cols: 1, rows: 1 }
  //       ];
  //     }

  //     return [
  //       { title: 'Card 1', cols: 2, rows: 1 },
  //       { title: 'Card 2', cols: 1, rows: 1 },
  //       { title: 'Card 3', cols: 1, rows: 2 },
  //       { title: 'Card 4', cols: 1, rows: 1 }
  //     ];
  //   })
  // );