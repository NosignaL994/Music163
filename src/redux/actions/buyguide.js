import {SET_BUY_GUIDE_SHOW} from "@/constant"

export function setBuyGuideShowAction (show) {
    return {
        type: SET_BUY_GUIDE_SHOW,
        data: show
    }
}