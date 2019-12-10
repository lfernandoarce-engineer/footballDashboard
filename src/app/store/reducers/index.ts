import { ActionReducerMap } from "@ngrx/store";
import { competitionsReducer, CompetitionsState } from "./competitions.reducer";
import { CompetitionDetailsState, competitionDetailsReducer } from './competition-details.reducer';
import { TeamDetailsState, teamDetailsReducer } from './team-details.reducer';
import { FavoriteTeamsState, favoriteTeamsReducer } from './favorite-teams.reducer';

interface AppState {
  competitionsState: CompetitionsState;
  competitionDetailsState: CompetitionDetailsState,
  teamDetailsState: TeamDetailsState, 
  favoriteTeamsState: FavoriteTeamsState
}

export const reducers: ActionReducerMap<AppState> = {
  competitionsState: competitionsReducer, 
  competitionDetailsState: competitionDetailsReducer, 
  teamDetailsState: teamDetailsReducer, 
  favoriteTeamsState: favoriteTeamsReducer
};
