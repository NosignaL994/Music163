import { Map } from "immutable"
import {SET_PLAY_SONG,SET_PLAY_DURATION,SET_PLAY_ARTISTS,SET_PLAY_ID} from "@/common/actionType"

const defaultState = Map({
    song: null,
    duration: 0,
    artists: null,
    id: 0
})

export default function reducer (state = defaultState, action) {
    const {type, data} = action
    switch (type) {
        case SET_PLAY_SONG:
            return state.set("song", data)
        case SET_PLAY_DURATION:
            return state.set("duration", data)
        case SET_PLAY_ARTISTS:
            return state.set("artists", data)
        case SET_PLAY_ID:
            return state.set("id", data)
        default:
            return state
    }
}