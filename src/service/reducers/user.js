import {Map} from "immutable"
import {getCookie} from "@/utils/storage"
import {
    SET_LOGINED,
    SET_USER_PROFILE
} from "@/constant"

const cookie = getCookie()
const defaultState = Map({
    logined: cookie ? true : false,
    profile: null
})

export default function reducer (state = defaultState, action) {
    const {type, data} = action
    switch (type) {
        case SET_LOGINED:
            return state.set("logined",data)
        case SET_USER_PROFILE:
            return state.set("profile", data)
        default:
            return state
    }
}