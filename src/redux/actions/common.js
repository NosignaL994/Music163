import { setBuyGuideShowAction } from "./buyguide"
import {switchVipGuideVisibleAction} from "./vipguide"

export function isAccessibleAction (track, action) {
    switch (track.fee) {
        case 8:
            return action
        case 1:
            return switchVipGuideVisibleAction()
        case 4:
            return setBuyGuideShowAction(true)
        default:
            console.log("track.fee 定义未知")
    }
}