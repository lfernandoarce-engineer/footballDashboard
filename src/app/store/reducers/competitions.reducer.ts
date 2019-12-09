
import { Competition } from '../models/competition';
import { createSelector } from '@ngrx/store';
import { Teams } from '../models/teams';

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
            return competitionsState;
        case 'SET_COMPETITION_TEAMS':
            let newState = {...competitionsState};

            newState.competitions = newState.competitions.map((comp) => {
                                if(comp.id == action.payload.compId) {
                                    comp.teams = action.payload.teams;
                                    comp.teamsNumber = action.payload.teamsNumber;                    
                                }
                                
                                return comp;
                            });
        
            return newState;
        default:
            return competitionsState
    }
}


export const selectCompetitionsState = (state) => state.competitionsState;
export const selectCompetitions = createSelector(selectCompetitionsState, (state) => state.competitions);