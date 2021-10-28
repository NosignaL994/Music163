import { Map } from "immutable"

import { 
    SWITCH_LOGIN_VISIBLE,
    SET_LOGIN_QRIMG,
    SET_LOGIN_QR_KEY,
    SET_LOGIN_QR_CODE,
    QR_WAITING
} from "@/constant"

const defaultState = Map({
    visible: false,
    qrimg: "",
    key: "",
    code: QR_WAITING
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
        case SET_LOGIN_QR_CODE:
            return state.set("code",data)
        default:
            return state
    }
}