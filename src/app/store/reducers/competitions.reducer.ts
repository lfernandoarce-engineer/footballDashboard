
import { Competition } from '../models/competition';
import { createSelector } from '@ngrx/store';

export interface CompetitionsState {
    competitions: Competition[]
} 

const initialCompetitionsState: CompetitionsState = {
    competitions: []
}

export function competitionsReducer(competitionsState = initialCompetitionsState, action) : CompetitionsState {
    switch (action.type) {
        case 'SET_COMPETITIONS':
            competitionsState = {
                ...competitionsState,
                competitions: action.payload
            };
    }

    return competitionsState;
}


export const selectCompetitionsState = (state) => state.competitionsState;
export const selectCompetitions = createSelector(selectCompetitionsState, (state) => state.competitions);