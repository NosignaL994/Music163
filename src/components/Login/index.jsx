import "./style.less"
import scanSuccessPng from "@/assets/images/scan_success.png"
import { Modal } from "antd";
import {useDispatch, useSelector} from "react-redux"
import { useEffect, useState } from "react";

import { getLoginQrKeyAction,
    switchLoginVisibleAction,
    checkLoginQrAction,
    setLoginCodeAction,
    setLoginedAction } from "@/redux/actions/login";

// import {reducer} from "@/redux/login"
export default function Login () {
    const dispatch = useDispatch()
    // const [status, setStatus] = useState(801)
    const [timer, setTimer] = useState(null)
    // const {visible,qrimg,code,key} = useSelector(state => {
    //     // console.log(state);
    //     const loginState = state.login
    //     return {
    //         visible: loginState.get("visible"),
    //         qrimg: loginState.get("qrimg"),
    //         code: loginState.get("code"),
    //         key: loginState.get("key")
    //     }
    // })
    const mapState = useSelector(state => state.login)
    const visible = mapState.get("visible")
    const qrimg = mapState.get("qrimg")
    const code = mapState.get("code")
    const key = mapState.get("key")
    const logined = mapState.get("logined")

    useEffect(() => {
        if (visible === true) {
            dispatch(getLoginQrKeyAction())
        } else {
            timer && clearInterval(timer)
        }
    }, [visible])
    useEffect(() => {
        if (key) {
            setTimer(setInterval(()=> {
                // console.log("timer running!")
                dispatch(checkLoginQrAction(key))
            }, 1000))
        }
    },[key])
    useEffect(() => {
        code === 800 && clearInterval(timer)
        if (code === 803) {
            dispatch(switchLoginVisibleAction())
            dispatch(setLoginedAction(true))
        }
    }, [code])
    // useEffect(() => {
    //     if (qrimg) {
    //         setTimer(setInterval(()=> dispatch(checkLoginQrAction(key)), 1000))
    //     }
    // }, [qrimg])
    function cancelHandler () {
        dispatch(switchLoginVisibleAction())
    }
    function refreshQrHandler () {
        dispatch(getLoginQrKeyAction())
        dispatch(setLoginCodeAction(801))
    }
    // console.log(code)
    return (
        
        <Modal 
        title="登录"
        visible={visible} 
        wrapClassName="login-frame"
        centered={true} 
        width="530px"
        onCancel={cancelHandler}
        footer={null}>
            {code === 802 ?
            <div className="login-qr-commit">
                <img src={scanSuccessPng} alt="" />
                <div>扫描成功</div>
                <div>请在手机上确认登录</div>
            </div> : 
            <div className="discover-login-qr">
                <div className="login-qr-left qr_guide"></div>
                
                <div className="login-qr-right">
                    <div className="qr-right-title">扫码登录</div>
                    <div 
                    className={code === 800 ? "qr-right-pic out-of-date" : "qr-right-pic"}>
                        <img className="" src={qrimg}/> 
                        <div className="qr-pic-mask">
                            <div>二维码已失效</div>
                            <button onClick={refreshQrHandler}>点击刷新</button>
                        </div>
                    </div>
                    <div className="qr-right-state">
                        使用&nbsp;<a href="https://music.163.com/download">网易云音乐APP</a>&nbsp;扫码登录
                    </div>
                </div>
            </div>}
            <div className="discover-login-other">
                <button>选择其他登录方式</button>
            </div>
        </Modal>
    )
}