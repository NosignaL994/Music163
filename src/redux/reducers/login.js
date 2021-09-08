import { Map } from "immutable"
// import storage from "redux-persist/lib/storage"
// import { persistReducer } from "redux-persist"
// import immutableTransform from "redux-persist-transform-immutable"
import { 
    SWITCH_LOGIN_VISIBLE,
    SET_LOGIN_QRIMG,
    SET_LOGIN_QR_KEY,
    SET_LOGIN_CODE,
    SET_LOGINED,
    SET_USER_PROFILE } from "@/common/actionType"
import {getCookie} from "@/utils/storage"
const cookie = getCookie()
const defaultState = Map({
    visible: false,
    qrimg: "",
    key: "",
    cookie: "",
    code: 801,
    logined: cookie ? true : false,
    profile: null
})

export default function reducer (state = defaultState, action) {
    const {type, data} = action
    switch (type) {
        case SWITCH_LOGIN_VISIBLE:
            return state.set("visible", !state.get("visible"))
        case SET_LOGIN_QR_KEY:
            return state.set("key", data)
        case SET_LOGIN_QRIMG:
            return state.set("qrimg", data)
        case SET_LOGIN_CODE:
            return data !== state.get("code") ? state.set("code", data) : state
        case SET_LOGINED:
            return state.set("logined", data)
        case SET_USER_PROFILE:
            return state.set("profile", data)
        default:
            return state
    }
}
// const persistConfig = {
//     key: "auth",
//     // transforms: [immutableTransform()],
//     storage,
//     whiteList: ["authInfo"]
// }
// export default persistReducer(persistConfig, reducer)