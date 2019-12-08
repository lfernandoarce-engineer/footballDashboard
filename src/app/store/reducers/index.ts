import { ActionReducerMap } from "@ngrx/store";
import { competitionsReducer, CompetitionsState } from "./competitions.reducer";

interface AppState {
  competitionsState: CompetitionsState;
}

export const reducers: ActionReducerMap<AppState> = {
  competitionsState: competitionsReducer
};
