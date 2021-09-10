import {Map} from "immutable"
import {SET_TOPLIST_LIST,ADD_TOPLIST} from "@/common/actionType"

const defaultState = Map({
    toplistList: null,
    toplists: {}
})

export default function reducer (state=defaultState, action) {
    const {type, data} = action
    switch (type) {
        case SET_TOPLIST_LIST:
            return state.set("toplistList",data)
        case ADD_TOPLIST:
            return state.set("toplists", {...state.get("toplists"), [data.id]:data})
        default:
            return state
    }
}