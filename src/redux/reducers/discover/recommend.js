import { Map } from "immutable";

import { GET_BANNER_OVER,
    SET_RCMD_SONGLIST,
    SET_RCMD_NEW,
    GET_RECOMMEND_SINGER_OVER,
    GET_RECOMMEND_ANCHOR_OVER} from "@/common/actionType";

const defaultState = Map({
    banners: null,
    songList: null,
    news: null,
    // singers: null,
    recommendAnchors: null,
    loginVisible: false
})

export default function reducer (state = defaultState, action) {

    const {type, data} = action
    switch (type) {
        case GET_BANNER_OVER:
            return state.set("banners", data)
        case SET_RCMD_SONGLIST:
            return state.set("songList", data)
        case SET_RCMD_NEW:
            return state.set("news", data)
        case GET_RECOMMEND_SINGER_OVER: 
            return state.set("singers", data)
        case GET_RECOMMEND_ANCHOR_OVER:
            return state.set("recommendAnchors", data)
        default:
            return state
    }
}
