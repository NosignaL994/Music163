import { Map } from "immutable"
import {
    SET_PLAY_SONG,
    SET_PLAYLIST,
    SET_PLAY_IDX,
    ADD_PLAY,
    SET_PLAY_URL,
    ADD_PLAYLIST} from "@/common/actionType"
const defaultState = Map({
    playIdx: -1,
    playlist: [],
    playUrl: ""
})

export default function reducer (state = defaultState, action) {
    const {type, data} = action
    switch (type) {
        case SET_PLAY_SONG:
            const oldPlaylist = state.get("playlist")
            const idx = oldPlaylist.findIndex(ele => ele.id === data.id)
            if (idx !== -1 ) {
                return state.set("playIdx", idx)
            } else {
                return state.merge({
                    playIdx: oldPlaylist.length,
                    playlist: [...oldPlaylist,data]
                })
            }
        case SET_PLAYLIST:
            return state.merge({
                playIdx: 0,
                playlist: data
            })
        case ADD_PLAYLIST:
            return state.set("playlist", [...state.get("playlist"),...data])
        case SET_PLAY_IDX:
            return state.set("playIdx", data)
        case ADD_PLAY:
            return state.set("playlist", [...state.get("playlist"),data])
        case SET_PLAY_URL:
            return state.set("playUrl", data)
        default:
            return state
    }
}