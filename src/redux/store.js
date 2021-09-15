import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from 'redux-thunk'
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import immutableTransform from "redux-persist-transform-immutable"

import headerReducer from "./reducers/header";
import playbarReducer from "./reducers/playbar"
import loginReducer from "./reducers/login"
import vipReducer from "./reducers/vipguide"
import recommendReducer from "./reducers/discover/recommend"
import toplistReducer from "./reducers/discover/toplist"
import singerReducer from "./reducers/discover/singer"
import radioReducer from "./reducers/discover/radio"
import songlistReducer from "./reducers/discover/songlist"

const reducer = combineReducers({
    header: headerReducer,
    recommend: recommendReducer,
    playbar: playbarReducer,
    login: loginReducer,
    vip: vipReducer,
    toplist: toplistReducer,
    singer: singerReducer,
    radio: radioReducer,
    songlist: songlistReducer
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