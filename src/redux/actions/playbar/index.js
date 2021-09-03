
import { SET_PLAY_SONG, SET_PLAY_DURATION,SET_PLAY_ARTISTS,SET_PLAY_ID } from "@/common/actionType"



export const setPlaySongAction = track => ({
    type: SET_PLAY_SONG,
    data: track.al
})

export const setPlayDurationAction = track => ({
    type: SET_PLAY_DURATION,
    data: track.dt
})

export const setPlayArtistsAction = track => ({
    type: SET_PLAY_ARTISTS,
    data: track.ar
})

export const setPlayIdAction = track => ({
    type: SET_PLAY_ID,
    data: track.id
})