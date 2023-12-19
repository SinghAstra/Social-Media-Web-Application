import {AUTH} from '../actions/actionTypes'
const initialState = {
    authState: null, 
  };
export const authReducer = (state = initialState,action) => {
    switch (action.type) {
        case AUTH:
            return {...state,authState:action.payload};
        default:
            return state;
    }
}