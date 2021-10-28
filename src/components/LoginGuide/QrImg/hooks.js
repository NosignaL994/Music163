import { useDispatch,useSelector } from "react-redux"
import { useRef,useEffect,useCallback } from "react"
import request from "@/utils/request"
import {
    getLoginQrKeyAction,
    getLoginQrimgAction,
    switchLoginVisibleAction
} from "@/service/actions/login"
import { setLoginedAction } from "@/service/actions/user"
import {
    QR_SUCCESS,
    QR_TIMEOUT,
    CHECK_QR_KEY_URI,
    SET_LOGIN_QR_CODE
} from "@/constant"
import {saveCookie} from "@/utils/storage"

export function useQrLogin () {
    const dispatch = useDispatch()
    const timer = useRef(null)
    const {key,qrimg,code} = useSelector(state => ({
        key: state.login.get("key"),
        qrimg: state.login.get("qrimg"),
        code: state.login.get("code")
    }))
    const refreshQrHandler = useCallback(() => {
        // 获取二维码的key，然后通过key 获取二维码图像
        dispatch(getLoginQrKeyAction()).then(({data}) => dispatch(getLoginQrimgAction(data)))
    }, [])
    const checkQrKey = useCallback(() => request.get(CHECK_QR_KEY_URI,{
        key,
        _t: Date.now().toString()
    }).then(data => {
        if (data.code === QR_SUCCESS) {
            saveCookie(data.cookie)
            dispatch(setLoginedAction(true))
            dispatch(switchLoginVisibleAction())
        } else {
            dispatch({
                type: SET_LOGIN_QR_CODE,
                data: data.code
            })
        }
    }))
    useEffect(refreshQrHandler, [refreshQrHandler])
    useEffect(() => {
        if (key && code !== QR_SUCCESS && code !==QR_TIMEOUT) {
            timer.current = setInterval(()=> checkQrKey(key), 1000)
        }
        return () => clearInterval(timer.current)
    },[code,key])
    return {qrimg,key,code,refreshQrHandler}
}