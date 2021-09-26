import { Map,List } from "immutable";

import {
    SET_TOP_ALL_SONGLIST,
    SET_SONGLIST_COUNT,
    SET_SONGLIST_CATEGORY,
    SET_RCMD_SONGLIST,
    ADD_SONGLIST,
    COMPLETE_SONGLIST_TRACKS,
    SET_LOGIN_RCMD_SONGLIST
} from "@/common/actionType"

const defaultState = Map({
    rcmdList: List([]),
    loginRcmdList: List([]),
    topAllList: List([]),
    hqSongListCount: 0,
    categories: null,
    songlists: Map({})
})

export default function reducer (state=defaultState,action) {
    const {type, data} = action
    switch (type) {
        case SET_RCMD_SONGLIST:
            return state.mergeIn(["rcmdList"],data)
        case SET_LOGIN_RCMD_SONGLIST:
            return state.mergeIn(["loginRcmdList"],data)
        case SET_TOP_ALL_SONGLIST:
            return state.mergeIn(["topAllList"],data)
        case SET_SONGLIST_COUNT:
            return state.set("hqSongListCount",data)
        case SET_SONGLIST_CATEGORY:
            const categories = []
            for (const key in data.categories) {
                categories.push({
                    id: key,
                    cat: data.categories[key],
                    group: data.sub.filter(item => item.category===parseInt(key))
                })
            }
            return state.set("categories",categories)
        case ADD_SONGLIST:
            // console.log(data);
            return state.setIn(["songlists",data.id],data)
        case COMPLETE_SONGLIST_TRACKS:
            // console.log(data.id);
            // console.log(data);
            return state.mergeIn(["songlists",data.id,"tracks"],data.tracks)
        default:
            return state
    }
}