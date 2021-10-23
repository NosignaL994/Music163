import { Map,List } from "immutable"
import {
    SET_PLAY_SONG,
    ADD_PLAY_SONG,
    SET_PLAYLIST,
    SET_PLAY_IDX,
    SET_PLAY_URL,
    ADD_PLAYLIST
} from "@/common/actionType"
const defaultState = Map({
    playIdx: -1,
    playlist: List([]), // 存储播放列表，元素是歌曲track
    playUrl: ""
})

export default function reducer (state = defaultState, action) {
    const {type, data} = action
    switch (type) {
        case SET_PLAY_SONG:
            const oldPlaylist = state.get("playlist")
            const idx = oldPlaylist.findIndex(ele => ele.id === data.id)
            return (idx !== -1 ) ? state.set("playIdx", idx) : state.mergeDeep({
                playIdx: oldPlaylist.size,
                playlist: [data]
            })
        case SET_PLAYLIST:
            return state.merge({
                playIdx: 0,
                playlist: List(data)
            })
        case ADD_PLAYLIST:
            return state.mergeIn(["playlist"], data)
        case SET_PLAY_IDX:
            return state.set("playIdx", data)
        case ADD_PLAY_SONG:
            return state.mergeIn(["playlist"],[data])
        case SET_PLAY_URL:
            return state.set("playUrl", data)
        default:
            return state
    }
}