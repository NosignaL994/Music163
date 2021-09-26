import {getRequest} from "@/utils/request"
import {
    NEW_ALBUM_URI
} from "@/common/constant"
import {
    SET_NEW_ALBUMS
} from "@/common/actionType"

export function getNewAlbumAction () {
    return dispatch => getRequest(NEW_ALBUM_URI)
        .then(response => dispatch({
            type: SET_NEW_ALBUMS,
            data: response.data.albums
        }))
        .catch(error => console.log(error))
} 