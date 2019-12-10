export class Teams {
    id: number;
    name: string;
    crestUrl: string;

    constructor(data: any) {
      Object.assign(this, data);
    }
}