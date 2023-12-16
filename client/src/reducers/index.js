import {combineReducers} from 'redux'
import { postReducer } from './post'

export const rootReducer = combineReducers({
    post:postReducer
})