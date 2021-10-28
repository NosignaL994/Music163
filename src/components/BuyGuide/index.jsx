import "./style.less"
import { Modal,Button } from "antd";
import { useSelector,useDispatch } from "react-redux";
import { setBuyGuideShowAction } from "@/service/actions/buyguide";

export default function BuyGuide () {
    const dispatch = useDispatch()
    const show = useSelector(state => state.buyguide.get("show"))
    function cancelShowHandler () {
        dispatch(setBuyGuideShowAction(false))
    }
    return <Modal centered footer={null} title="提示" visible={show} className="buyguide-modal" onCancel={cancelShowHandler}>
        <div className="buyguide-text">
            <div className="icon2 buyguide-icon"></div>
            <span>版权方要求，当前专辑需单独付费，购买数字专辑即可无限畅享</span>
        </div>
        <div className="buyguide-btns">
            <Button type="primary">立即订购</Button>
            <Button onClick={cancelShowHandler}>以后再说</Button>
        </div>
    </Modal>
}