import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Teams } from '../store/models/teams';
import { Competition } from '../store/models/competition';
import { match } from 'minimatch';

@Component({
    selector: 'next-match-dialog',
    templateUrl: 'next-match-dialog.html',
  })
export class NextMatchDialog implements OnDestroy {
    headers = new HttpHeaders().append("X-Auth-Token", "d9b2c29baac94818a4908116a55d6f08");
    nextMatch: Match;

    //TODO: Handle this in a Service??
    performHttpRequest(resource) {
        return this.http.get(`https://api.football-data.org/${resource}`, //Filtered by Europe Area
                        { headers: this.headers })
                        .toPromise();
    }

constructor(
    public dialogRef: MatDialogRef<NextMatchDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpClient) {
    }

    ngOnInit() {
        this.performHttpRequest(`v2/teams/${this.data.teamId}/matches?status=SCHEDULED`)
                .then((response: MatchesResponse) => {
                    if (response && response.matches) {
                        this.nextMatch = this.getNextMatch(response.matches);
                    }
                });
    }

    getNextMatch(matches: Match[]) {
        let result: Match;
        
        matches = matches.sort((a, b) => { return (new Date(a.utcDate).getMilliseconds() - (new Date(b.utcDate).getMilliseconds()));});

        if (matches.length > 0) {
            result = matches[0];
            result.againstTeam = result.awayTeam.id === this.data.teamId ? result.homeTeam: result.awayTeam;
        }

        return result;
    }

    ngOnDestroy(){
    }
}

export interface DialogData {
    teamId: number
}

export interface MatchesResponse {
    competition: Competition,
    matches: Match[]
}

export interface Match {
    utcDate: string,
    homeTeam: Teams,
    awayTeam: Teams,
    againstTeam: Teams
}
