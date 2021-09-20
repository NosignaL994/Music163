import {getRequest,getPlaylistDetail} from "@/utils/request"
import {SET_TOPLIST_LIST,ADD_TOPLIST} from "@/common/actionType"
// import 
export function getToplistListAction () {
    return dispatch => getRequest('/toplist')
        .then(response => {
            dispatch({
                type: SET_TOPLIST_LIST,
                data: response.data.list
            })
            return response.data.list
        })
        .catch(error => console.log(error))
}

export function getToplistDetailAction (id) {
    return dispatch => getPlaylistDetail(id)
        .then(playlist => dispatch({
            type: ADD_TOPLIST,
            data: playlist
        })).catch(error => console.log(error))
}