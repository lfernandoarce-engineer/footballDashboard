import { createSelector } from '@ngrx/store';
import { CompetitionDetails } from '../models/competitionDetails';

export interface CompetitionDetailsState {
    competitionDetails: CompetitionDetails
} 

const initialCompetitionDetailsState: CompetitionDetailsState = {
    competitionDetails: null
}

export function competitionDetailsReducer(competitionDetailsState = initialCompetitionDetailsState, action) : CompetitionDetailsState {
    switch (action.type) {
        case 'SET_COMPETITION_DETAILS':
            competitionDetailsState = {
                ...competitionDetailsState,
                competitionDetails: action.payload
            };
            return competitionDetailsState;
        default:
            return competitionDetailsState;
    }
}


export const selectCompetitionDetailsState = (state) => state.competitionDetailsState;
export const selectCompetitionDetails = createSelector(selectCompetitionDetailsState, (state) => state.competitionDetails);