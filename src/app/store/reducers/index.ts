import { ActionReducerMap } from "@ngrx/store";
import { competitionsReducer, CompetitionsState } from "./competitions.reducer";
import { CompetitionDetailsState, competitionDetailsReducer } from './competition-details.reducer';

interface AppState {
  competitionsState: CompetitionsState;
  competitionDetailsState: CompetitionDetailsState
}

export const reducers: ActionReducerMap<AppState> = {
  competitionsState: competitionsReducer, 
  competitionDetailsState: competitionDetailsReducer
};
