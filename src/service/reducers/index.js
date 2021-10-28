
import {combineReducers} from "redux"

import headerReducer from "./header";
import playbarReducer from "./playbar"
import loginReducer from "./login"
import vipguideReducer from "./vipguide"
import buyguideReducer from "./buyguide"
import bannerReducer from "./banner"
import toplistReducer from "./toplist"
import singerReducer from "./singer"
import radioReducer from "./radio"
import songlistReducer from "./songlist"
import commentReducer from "./comment"
import albumReducer from "./album"
import userReducer from "./user"
const reducer = combineReducers({
    header: headerReducer,
    banner: bannerReducer,
    playbar: playbarReducer,
    login: loginReducer,
    vipguide: vipguideReducer,
    buyguide: buyguideReducer,
    toplist: toplistReducer,
    singer: singerReducer,
    radio: radioReducer,
    songlist: songlistReducer,
    comment: commentReducer,
    album: albumReducer,
    user: userReducer
})
export default reducer