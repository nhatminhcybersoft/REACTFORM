import {combineReducers,createStore} from "redux";
import {QLSVReducer} from "./reducers/QLSVReducer";


const rootReducer = combineReducers({
    QLSVReducer
})

export const store = createStore(rootReducer);