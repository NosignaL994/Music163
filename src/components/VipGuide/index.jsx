import "./style.less"
import { Modal } from "antd"
import { useSelector,useDispatch } from "react-redux"

import {switchVipGuideVisibleAction} from "@/redux/actions/vipguide"
export default function VipGuide () {
    const dispatch = useDispatch()
    const {visible} = useSelector(state => {
        const vipguideState = state.vip
        return {
            visible: vipguideState.get("visible")
        }
    })
    function cancelHandler () {
        dispatch(switchVipGuideVisibleAction())
    }
    return <Modal 
    wrapClassName="vipguide-frame"
    title="开通会员"
    footer={null}
    closable={true}
    centered={true}
    visible={visible}
    onCancel={cancelHandler}>
        <div className="vipguide-text">该资源为VIP专享，开通VIP畅听无阻</div>
        <div className="vipguide-title">VIP尊享</div>
        <ul className="vipguide-privilege">
            <li>
                <img src="https://nos.netease.com/yyimgs/xHGdjp4ZZW96of8vh0zkTQ==/109951164007422212" alt="" />
                <div>VIP专属曲库</div>
            </li>
            <li>
                <img src="https://nos.netease.com/yyimgs/j6OF7Fd2jtOgS9C9n8Iyag==/109951164007429079" alt="" />
                <div>千万歌曲免费下载</div>
            </li>
            <li>
                <img src="https://nos.netease.com/yyimgs/urnT1sEsA6aUXPPpVmBVgQ==/109951164000648486" alt="" />
                <div>无损音质</div>

            </li>
        </ul>
        <button className="vipguide-btn">新客2.8元开通</button>
        <a href="javascript:;" className="vipguide-buysong">仅购买此曲&nbsp;&gt;</a>
    </Modal>
}