export class TeamPlayer {
    id: number;
    name: string;
    position: string;
    dateOfBirth: Date;
    nationality: string;
    age: number;
    
    constructor(data: any) {
      Object.assign(this, data);
    }
}

