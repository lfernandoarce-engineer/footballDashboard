import { Teams } from './teams';

export class StandingTeam {
    position: number;
    team: Teams;
    playedGames: number;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;

    constructor(data: any) {
      Object.assign(this, data);
    }
}
