
import { SET_PLAY_SONG, SET_PLAYLIST,SET_PLAY_IDX } from "@/common/actionType"
// import {getRequest} from "@/utils/request"


export const setPlaySongAction = track => ({
    type: SET_PLAY_SONG,
    data: track
})
export const setPlaylistAction = playlist => ({
    type: SET_PLAYLIST,
    data: playlist
})

export const setPlayIdxAction = idx => ({
    type: SET_PLAY_IDX,
    data: idx
})

// export const setPlayUrlAction = track => dispatch => getRequest("/song/url", {
//     id: track.id
// })
// // .then(response => dispatch({
// //     type: SET_PLAY_URL,
// //     data: response.data.data[0].url
// // })).catch(error => console.log(error))
// .then(response => console.log(response.data))
