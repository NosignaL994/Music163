import {
    SWITCH_LOGIN_VISIBLE,
    SET_LOGIN_QRIMG,
    SET_LOGIN_QR_KEY,
    SET_LOGIN_CODE,
    SET_LOGINED,
    SET_USER_PROFILE 
} from "@/constant"
import request from "@/utils/request"
import { saveCookie,clearCookie } from "@/utils/storage"
export function switchLoginVisibleAction () {
    return {
        type: SWITCH_LOGIN_VISIBLE,
        data: null
    }
}

export function getLoginQrKeyAction () {
    return dispatch => request.get("/login/qr/key",{
        _t: Date.now().toString()
    }).then(data => {
            const key = data.data.unikey
            dispatch(getLoginQrimgAction(key))
            dispatch({
                type: SET_LOGIN_QR_KEY,
                data: key
            })
    })
}

export function getLoginQrimgAction (key) {
    return dispatch => request.get("/login/qr/create",{
        key,
        qrimg: true,
        _t: Date.now().toString()
    }).then(data => dispatch({
        type: SET_LOGIN_QRIMG,
        data: data.data.qrimg
    }))
}

export function checkLoginQrAction (key) {
    return dispatch => request.get("/login/qr/check",{
        key,
        _t: Date.now().toString()
    }).then(data => {
        
        dispatch({
            type: SET_LOGIN_CODE,
            data: data.code
        })
        data.code === 803 && saveCookie(data.cookie)
    })
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
    // const cookie = getCookie()
    return dispatch => request.get("user/account")
        .then(data => dispatch({
            type: SET_USER_PROFILE,
            data: data.profile
        }))
}

export function logoutAction () {
    return dispatch => request.get("/logout")
        .then(data => {
            clearCookie()
            dispatch(setLoginedAction(false))
        })
}