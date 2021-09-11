import {Map} from "immutable"

import { ADD_SINGER,SET_SINGER_TOPLIST } from "@/common/actionType";

const defaultState = Map({
    singerToplist: null,
    singers: {}
})

export default function reducer (state=defaultState, action) {
    const {type, data} = action
    switch (type) {
        case ADD_SINGER:
            // console.log(data);
            return state.set("singers",{...state.get("singers"),[data.artist.id]:data})
        case SET_SINGER_TOPLIST:
            return state.set("singerToplist", data)
        default:
            return state
    }
}