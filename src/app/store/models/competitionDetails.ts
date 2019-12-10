import { Competition } from './competition';
import { CurrentSeason } from './currentSeason';
import { Standings } from './standings';

export interface CompetitionDetails {
    competition: Competition;
    season: CurrentSeason;
    standings: Standings;
  }