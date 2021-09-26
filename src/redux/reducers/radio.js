import { Map,List } from "immutable";

import { SET_HOT_RADIOS } from "@/common/actionType";

const defaultState = Map({
    hotList: List([]),
})

export default function reducer (state=defaultState,action) {
    const {type, data} = action
    switch (type) {
        case SET_HOT_RADIOS:
            // console.log(data);
            return state.mergeIn(["hotList"],data)
        default:
            return state
    }
 }