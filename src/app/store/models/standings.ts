import { StandingTeam } from './standingTeam';

export class Standings {
    stage: string;
    type: string;
    table: StandingTeam[]

    constructor(data: any) {
      Object.assign(this, data);
    }
}
