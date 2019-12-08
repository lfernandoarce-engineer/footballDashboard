export class CurrentSeason {
    id: number;
    currentMatchday: number;
    startDate: Date;
    endDate: Date;

    constructor(data: any) {
        Object.assign(this, data);
    }
}