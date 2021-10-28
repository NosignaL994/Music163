import { setBuyGuideShowAction } from "../services/actions/buyguide"
import {switchVipGuideVisibleAction} from "../services/actions/vipguide"
import { useDispatch } from "react-redux"
export function useIsAccessible(track) {
    const dispatch = useDispatch()
    switch (track.fee) {
        case 1:
            dispatch(switchVipGuideVisibleAction())
            return false
        case 4:
            dispatch(setBuyGuideShowAction())
            return false
        default:
            return true
    }
}