import {Map} from "immutable"

import {SWITCH_VIP_VISIBLE} from "@/common/actionType"

const defaultState = Map({
    visible: false
})
export default function reducer (state = defaultState, action) {
    const {type, data} = action
    switch (type) {
        case SWITCH_VIP_VISIBLE:
            return state.set("visible", !state.get("visible"))
        default:
            return state
    }
}