import { Map } from "immutable";

import {
    SET_SONGLIST,
    SET_SONGLIST_COUNT,
    SET_SONGLIST_CATEGORY} from "@/common/actionType"

const defaultState = Map({
    hqSongList: [],
    hqSongListCount: 0,
    categories: null,
})

export default function reducer (state=defaultState,action) {
    const {type, data} = action
    switch (type) {
        case SET_SONGLIST:
            // console.log(data);
            return state.set("hqSongList",[...state.get("hqSongList"),...data])
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
        default:
            return state
    }
}