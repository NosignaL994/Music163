import {Map,List} from "immutable"

import { ADD_SINGER,SET_TOP_SINGERS } from "@/common/actionType";

const defaultState = Map({
    topList: List([]), // 歌手榜单
    singers: Map({})
})

export default function reducer (state=defaultState, action) {
    const {type, data} = action
    switch (type) {
        case ADD_SINGER:
            return state.setIn(["singers",data.artist.id],data)
        case SET_TOP_SINGERS:
            // console.log(data);
            return state.mergeIn(["topList"], data)
        default:
            return state
    }
}