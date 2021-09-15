import { Map } from "immutable";

import { SET_HOT_RADIOS } from "@/common/actionType";

const defaultState = Map({
    hotRadio: null
})

export default function reducer (state=defaultState,action) {
    const {type, data} = action
    switch (type) {
        case SET_HOT_RADIOS:
            // console.log(data);
            return state.set("hotRadio",data)
        default:
            return state
    }
 }