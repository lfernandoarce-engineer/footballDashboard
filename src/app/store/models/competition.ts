import { Area } from './area';
import { CurrentSeason } from './currentSeason';
import { Teams } from './teams';

export class Competition {
    id: number;
    area: Area;
    name: string;
    currentSeason: CurrentSeason;
    lastUpdated: Date;
    teamsNumber: number;
    teams: Teams[];

    constructor(data: any) {
      Object.assign(this, data);
    }
}
