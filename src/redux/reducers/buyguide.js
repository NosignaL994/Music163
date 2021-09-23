import { Map } from "immutable";
import { SET_BUY_GUIDE_SHOW } from "@/common/actionType";
const defaultState = Map({
    show: false
})

export default function reducer (state = defaultState, action) {
    const {type, data} = action
    switch (type) {
        case SET_BUY_GUIDE_SHOW:
            return state.set("show", data)
        default:
            return state
    }
}