import { Map,List } from "immutable";

import {
    SET_TOP_SONGLIST,
    SET_TOP_CATEGORY,
    SET_RCMD_SONGLIST,
    ADD_SONGLIST,
    COMPLETE_SONGLIST_TRACKS,
    SET_LOGIN_RCMD_SONGLIST
} from "@/constant"

const defaultState = Map({
    rcmdList: List([]),
    loginRcmdList: List([]),
    top: null,
    // hqSongListCount: 0,
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
        case SET_TOP_SONGLIST:
            // 歌单种类不同，以各自的分类为键
            const {response,order} = data
            return state.mergeDeepIn([response.cat], {
                total: response.total,
                [order]: response.playlists
            })
        case SET_TOP_CATEGORY:
            const cat = {}
            const songlistObj = {}
            for (const key in data.categories) {
                const name = data.categories[key]
                cat[name] = {
                    id: key,
                    list: []
                }
            }
            for (const item of data.sub) {
                const key = item.category
                const name = data.categories[key]
                cat[name].list.push(item.name)
                songlistObj[item.name] = {
                    total: 0,
                    hot: [],
                    new: []
                }
            }
            songlistObj["全部"] = {
                total: 0,
                hot: [],
                new: []
            }
            // console.log(songlistObj);
            return state.merge({
                categories: cat,
                ...songlistObj
            })
        case ADD_SONGLIST:
            return state.setIn(["songlists",data.id],data)
        case COMPLETE_SONGLIST_TRACKS:
            return state.mergeIn(["songlists",data.id,"tracks"],data.tracks)
        default:
            return state
    }
}