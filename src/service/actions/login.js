import {
    SWITCH_LOGIN_VISIBLE,
    SET_LOGIN_QRIMG,
    SET_LOGIN_QR_KEY,
    
} from "@/constant"
import request from "@/utils/request"

export function switchLoginVisibleAction () {
    return {
        type: SWITCH_LOGIN_VISIBLE,
        data: null
    }
}

export function getLoginQrKeyAction () {
    return dispatch => request.get("/login/qr/key",{
        _t: Date.now().toString()
    }).then(data => dispatch({
                type: SET_LOGIN_QR_KEY,
                data: data.data.unikey
            }))
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

