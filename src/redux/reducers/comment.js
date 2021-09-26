import { List } from "immutable";
import {
    ADD_SONGLIST_COMMENT,
    ADD_SONGLIST_HOT_COMMENT
} from "@/common/actionType"
const defaultState = {
    songlist: List([]),
    songlistHot: List([])
}
export default function reducer (state=defaultState, action) {
    const {type, data} = action
    switch (type) {
        case ADD_SONGLIST_COMMENT:
            return state.songlist.push(data)
        case ADD_SONGLIST_HOT_COMMENT:
            return state.songlistHot.push(data)
        default:
            return state
    }
}