import {
    SET_LOGINED,
    SET_USER_PROFILE,
    USER_PROFILE_URI,
    USER_LOGOUT_URI
} from "@/constant"
import request from "@/utils/request"
import {clearCookie} from "@/utils/storage"
export function setLoginedAction (logined) {
    return {
        type: SET_LOGINED,
        data: logined
    }
}

export function getUserProfileAction () {
    return dispatch => request.get(USER_PROFILE_URI)
        .then(data => dispatch({
            type: SET_USER_PROFILE,
            data: data.profile
        }))
}
export function logoutAction () {
    return dispatch => request.get(USER_LOGOUT_URI)
        .then(() => {
            clearCookie()
            dispatch(setLoginedAction(false))
        })
}