import { setBuyGuideShowAction } from "./buyguide"
import {switchVipGuideVisibleAction} from "./vipguide"

export function isAccessibleAction (track, action) {

    switch (track.fee) {
        case 1:
            return switchVipGuideVisibleAction()
        case 4:
            return setBuyGuideShowAction(true)
        default:
            return action
    }
}