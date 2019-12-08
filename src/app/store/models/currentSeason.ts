export class CurrentSeason {
    id: number;
    currentMatchday: string;
    startDate: string;
    endDate: string;

    constructor(data: any) {
        Object.assign(this, data);
    }
}