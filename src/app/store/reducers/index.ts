import { ActionReducerMap } from "@ngrx/store";
import { competitionsReducer, CompetitionsState } from "./competitions.reducer";
import { CompetitionDetailsState, competitionDetailsReducer } from './competition-details.reducer';
import { TeamDetailsState, teamDetailsReducer } from './team-details.reducer';

interface AppState {
  competitionsState: CompetitionsState;
  competitionDetailsState: CompetitionDetailsState,
  teamDetailsState: TeamDetailsState
}

export const reducers: ActionReducerMap<AppState> = {
  competitionsState: competitionsReducer, 
  competitionDetailsState: competitionDetailsReducer, 
  teamDetailsState: teamDetailsReducer
};
