import { Teams } from './teams';

export class FavoriteTeams {
    teams: Teams[];    

    constructor(data: any) {
      Object.assign(this, data);
    }
}