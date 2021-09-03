import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk'

import headerReducer from "./reducers/header";
import discoverReducer from "./reducers/discover"
import playbarReducer from "./reducers/playbar"

const reducer = combineReducers({
    header: headerReducer,
    discover: discoverReducer,
    playbar: playbarReducer
})
const store = createStore(reducer, applyMiddleware(thunk))

export default store