import { 
    ADD_SINGER,
    SET_TOP_SINGERS,
} from "@/common/actionType"
import {
    TOP_SINGER_URI,
    SINGER_DETAIL_URI
} from "@/common/constant"
import { 
    getRequest
 } from "@/utils/request"
export function getSingerDetailAction (id) {
    return dispatch => getRequest(SINGER_DETAIL_URI,{id}).then(response => {
        dispatch({
        type: ADD_SINGER,
        data: response.data.data
    })}).catch(error => console.log(error))
}

export function getTopSingerAction () {
    return dispatch => getRequest(TOP_SINGER_URI)
    .then(response => {
        const artists = response.data.artists
        // console.log(artists);
        dispatch({
            type: SET_TOP_SINGERS,
            data: artists
        })
        for (const artist of artists.slice(0,5)) {
            dispatch(getSingerDetailAction(artist.id))
        }
    }).catch(error => console.log(error))
}

