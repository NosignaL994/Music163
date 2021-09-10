import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk'
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import immutableTransform from "redux-persist-transform-immutable"

import headerReducer from "./reducers/header";
import discoverReducer from "./reducers/discover"
import playbarReducer from "./reducers/playbar"
import loginReducer from "./reducers/login"
import vipReducer from "./reducers/vipguide"
import toplistReducer from "./reducers/toplist"
const reducer = combineReducers({
    header: headerReducer,
    discover: discoverReducer,
    playbar: playbarReducer,
    login: loginReducer,
    vip: vipReducer,
    toplist: toplistReducer
})
// const persistConfig = {
//     key: "root",
//     transforms: [immutableTransform()],
//     storage,
//     blackList: ["root"]
//     // whiteList: []
// }
// const persistedReducer = persistReducer(persistConfig, reducer)
export const store = createStore(reducer, applyMiddleware(thunk))
// export const persistor = persistStore(store)
// export default store