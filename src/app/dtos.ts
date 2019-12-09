import { Competition } from './store/models/competition';
import { Teams } from './store/models/teams';

export interface CompetitionsResponse {
    competitions: Competition[]
  }
  
export interface CompetitionTeamsResponse {
count: number,
teams: Teams[]
}