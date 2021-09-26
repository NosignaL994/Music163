import {Map} from "immutable"
import {
    SET_TOPLISTS,
    SET_TOPLIST_CUR_ID} from "@/common/actionType"
// 歌曲榜单
const defaultState = Map({
    toplists: null,
    curId: 0
})

export default function reducer (state=defaultState, action) {
    const {type, data} = action
    switch (type) {
        case SET_TOPLISTS:
            return state.set("toplists",data)
        case SET_TOPLIST_CUR_ID:
            return state.set("curId", data)
        default:
            return state
    }
}