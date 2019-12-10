import { createSelector } from '@ngrx/store';
import { CompetitionDetails } from '../models/competitionDetails';
import { Teams } from '../models/teams';

export interface TeamDetailsState {
    teamDetails: Teams
} 

const initialTeamDetailsState: TeamDetailsState = {
    teamDetails: null
}

export function teamDetailsReducer(teamDetailsState = initialTeamDetailsState, action) : TeamDetailsState {
    switch (action.type) {
        case 'SET_TEAM_DETAILS':
                teamDetailsState = {
                ...teamDetailsState,
                teamDetails: action.payload
            };
            return teamDetailsState;
        default:
            return teamDetailsState;
    }
}


export const selectTeamDetailsState = (state) => state.teamDetailsState;
export const selectTeamDetails = createSelector(selectTeamDetailsState, (state) => state.teamDetails);