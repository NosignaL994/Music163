import { Map } from "immutable";

import { GET_BANNER_OVER, GET_HOTRECOMMEND_OVER, GET_RECOMMEND_NEW_OVER,GET_TOPLIST_OVER,GET_RISING_TOPLIST_OVER,
GET_NEW_TOPLIST_OVER,GET_ORIGINAL_TOPLIST_OVER,GET_RECOMMEND_SINGER_OVER,GET_RECOMMEND_ANCHOR_OVER } from "@/common/actionType";

const defaultState = Map({
    banners: null,
    hotRecommends: null,
    recommendNews: null,
    risingToplist: null,
    newToplist: null,
    originalToplist: null,
    recommendSingers: null,
    recommendAnchors: null,
})

export default function reducer (state = defaultState, action) {
    const {type, data} = action
    switch (type) {
        case GET_BANNER_OVER:
            return state.set("banners", data)
        case GET_HOTRECOMMEND_OVER:
            return state.set("hotRecommends", data)
        case GET_RECOMMEND_NEW_OVER:
            return state.set("recommendNews", data)
        case GET_RISING_TOPLIST_OVER:
            return state.set("risingToplist", data)
        case GET_NEW_TOPLIST_OVER:
            return state.set("newToplist", data)
        case GET_ORIGINAL_TOPLIST_OVER:
            return state.set("originalToplist", data)
        case GET_RECOMMEND_SINGER_OVER: 
            return state.set("recommendSingers", data)
        case GET_RECOMMEND_ANCHOR_OVER:
            return state.set("recommendAnchors", data)
        default:
            return state
    }
}
