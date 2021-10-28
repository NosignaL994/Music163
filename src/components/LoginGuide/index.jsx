import "./style.less"
import { Modal } from "antd";
import {useDispatch, useSelector} from "react-redux"
import {switchLoginVisibleAction} from "@/service/actions/login";
import QrImg from "./QrImg"
import { useCallback } from "react";

export default function LoginGuide () {
    const dispatch = useDispatch()
    const visible = useSelector(state => state.login.get("visible"))
    const cancelHandler = useCallback(() => dispatch(switchLoginVisibleAction()),[])
    // console.log(visible);
    return (
        <Modal 
        title="登录"
        visible={visible} 
        wrapClassName="login-frame"
        centered={true} 
        width="530px"
        onCancel={cancelHandler}
        footer={null}>
            <QrImg/>
            <div className="discover-login-other">
                <button>选择其他登录方式</button>
            </div>
        </Modal>
    )
}