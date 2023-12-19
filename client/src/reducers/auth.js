import {AUTH, LOG_OUT} from '../actions/actionTypes'
const initialState = {
    authState: null, 
  };
export const authReducer = (state = initialState,action) => {
    switch (action.type) {
        case AUTH:
            return {...state,authState:action.payload};
        case LOG_OUT:
            return {...state,authState:null}
        default:
            return state;
    }
}