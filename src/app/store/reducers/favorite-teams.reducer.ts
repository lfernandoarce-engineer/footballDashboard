
import { FavoriteTeams } from '../models/favoriteTeams';
import { createSelector } from '@ngrx/store';
import { Teams } from '../models/teams';

export interface FavoriteTeamsState {
    favoriteTeams: FavoriteTeams
} 

const initialFavoriteTeamsState: FavoriteTeamsState = {
    favoriteTeams: new FavoriteTeams({ teams: [] })
}

export function favoriteTeamsReducer(favoriteTeamsState = initialFavoriteTeamsState, action) : FavoriteTeamsState {
    switch (action.type) {
        case 'ADD_FAVORITE_TEAM':
            let addState = {...favoriteTeamsState};
            addState.favoriteTeams.teams.push(action.payload);

            return addState;
        case 'REMOVE_FAVORITE_TEAM':
            let removeState = {...favoriteTeamsState};
            removeState.favoriteTeams.teams = removeState.favoriteTeams.teams.filter((t) => t.id !== action.payload.teamId);

            return removeState;
        default:
            return favoriteTeamsState;
    }
}


export const selectFavoriteTeamsState = (state) => state.favoriteTeamsState;
export const selectFavoriteTeams = createSelector(selectFavoriteTeamsState, (state) => state.favoriteTeams);