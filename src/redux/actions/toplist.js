import {getRequest,getPlaylistDetail} from "@/utils/request"
import {
    SET_TOPLIST_LIST,
    ADD_TOPLIST,
    SET_TOPLIST_CUR_ID,
    SET_TOPLISTS,
    ADD_SONGLIST
} from "@/common/actionType"
import {
    TOPLISTS_URI
} from "@/common/constant"



export function setToplistCurIdAction (id) {
    return {
        type: SET_TOPLIST_CUR_ID,
        data: id
    }
}

export function getToplistsAction () {
    return dispatch => {
        getRequest(TOPLISTS_URI).then(response => {
            dispatch({
                type: SET_TOPLISTS,
                data: response.data.list
            })
        }).catch(error => console.log(error))
    }
} 