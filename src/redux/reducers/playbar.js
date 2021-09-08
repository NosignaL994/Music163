import { Map } from "immutable"
import {SET_PLAY_SONG,SET_PLAYLIST,SET_PLAY_IDX} from "@/common/actionType"
const defaultState = Map({
    playIdx: -1,
    playlist: []
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
        case SET_PLAY_IDX:
            return state.set("playIdx", data)
        default:
            return state
    }
}