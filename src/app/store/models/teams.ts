import { TeamPlayer } from './teamPlayer';
import { Area } from './area';

export class Teams {
    id: number;
    name: string;
    area: Area;
    crestUrl: string;
    address: string; 
    phone: string;
    website: string; 
    email: string;
    founded: number;
    venue: string;
    squad: TeamPlayer[]    

    constructor(data: any) {
      Object.assign(this, data);
    }
}