import { CREATE_POST, FETCH_ALL_POST } from "../actions/actionTypes";

export const postReducer = (state = [],action) => {
    switch(action.type){
        case FETCH_ALL_POST:
            return action.payload
        case CREATE_POST:
            return [
                ...state,
                action.payload
            ]
        default:
            return state
    }
}