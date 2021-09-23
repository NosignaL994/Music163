import {SET_BUY_GUIDE_SHOW} from "@/common/actionType"

export function setBuyGuideShowAction (show) {
    return {
        type: SET_BUY_GUIDE_SHOW,
        data: show
    }
}