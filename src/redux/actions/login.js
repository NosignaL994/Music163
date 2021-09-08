import { SWITCH_LOGIN_VISIBLE,
    SET_LOGIN_QRIMG,
    SET_LOGIN_QR_KEY,
    SET_LOGIN_CODE,
    SET_LOGINED,
    SET_USER_PROFILE } from "@/common/actionType"
import {getRequest} from "@/utils/request"
import { saveCookie,getCookie } from "@/utils/storage"
// import { SET_LOGINED } from "../../common/actionType"
export function switchLoginVisibleAction () {
    return {
        type: SWITCH_LOGIN_VISIBLE,
        data: null
    }
}

export function getLoginQrKeyAction () {
    return dispatch => getRequest("/login/qr/key",{
        _t: Date.now().toString()
    }).then(response => {
            const key = response.data.data.unikey
            dispatch(getLoginQrimgAction(key))
            dispatch({
                type: SET_LOGIN_QR_KEY,
                data: key
            })
    }).catch(error => console.log(error))
}

export function getLoginQrimgAction (key) {
    return dispatch => getRequest("/login/qr/create",{
        key,
        qrimg: true,
        _t: Date.now().toString()
    }).then(response => dispatch({
        type: SET_LOGIN_QRIMG,
        data: response.data.data.qrimg
    })).catch(error => console.log(error))
}

export function checkLoginQrAction (key) {
    return dispatch => getRequest("/login/qr/check",{
        key,
        _t: Date.now().toString()
    }).then(response => {
        
        dispatch({
            type: SET_LOGIN_CODE,
            data: response.data.code
        })
        response.data.code === 803 && saveCookie(response.data.cookie)
    }).catch(error => console.log(error))
}

export function setLoginCodeAction (code) {
    // console.log(code)
    return {
        type: SET_LOGIN_CODE,
        data: code
    }
}
export function setLoginedAction (logined) {
    return {
        type: SET_LOGINED,
        data: logined
    }
}

export function getUserProfileAction () {
    const cookie = getCookie()
    return dispatch => getRequest("user/account", {
            cookie
        }).then(response => dispatch({
            type: SET_USER_PROFILE,
            data: response.data.profile
        })).catch(error => console.log(error))
}