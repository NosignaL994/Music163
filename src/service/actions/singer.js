import { 
    ADD_SINGER,
    SET_TOP_SINGERS,
    TOP_SINGER_URI,
    SINGER_DETAIL_URI
} from "@/constant"

import request from "@/utils/request"

export function getSingerDetailAction (id) {
    return dispatch => request.get(SINGER_DETAIL_URI,{id})
    .then(data => {
        // console.log(data);
        dispatch({
        type: ADD_SINGER,
        data: data.data
    })})
}

export function getTopSingerAction () {
    return dispatch => request.get(TOP_SINGER_URI)
    .then(data => {
        // console.log(data);
        const artists = data.artists
        dispatch({
            type: SET_TOP_SINGERS,
            data: artists
        })
        // console.log(artists);
        for (const artist of artists.slice(0,5)) {
            dispatch(getSingerDetailAction(artist.id))
        }
    })
}

