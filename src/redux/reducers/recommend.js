import { Map } from "immutable";

import { 
    SET_BANNERS,
} from "@/constant";

const defaultState = Map({
    banners: null
})

export default function reducer (state = defaultState, action) {

    const {type, data} = action
    switch (type) {
        case SET_BANNERS:
            return state.set("banners", data)
        default:
            return state
    }
}
