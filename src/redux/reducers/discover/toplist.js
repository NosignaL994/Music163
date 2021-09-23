import {Map} from "immutable"
import {
    SET_TOPLIST_LIST,
    ADD_TOPLIST,
    SET_TOPLIST_INDEX} from "@/common/actionType"

const defaultState = Map({
    toplistList: null,
    toplists: Map({}),
    index: 0
})

export default function reducer (state=defaultState, action) {
    const {type, data} = action
    switch (type) {
        case SET_TOPLIST_LIST:
            return state.set("toplistList",data)
        case ADD_TOPLIST:
            return state.set("toplists", state.get("toplists").set(data.id, data))
        case SET_TOPLIST_INDEX:
            return state.set("index", data)
        default:
            return state
    }
}