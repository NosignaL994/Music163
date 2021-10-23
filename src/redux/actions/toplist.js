import {getRequest} from "@/utils/request"
import {
    SET_TOPLIST_CUR_ID,
    SET_TOPLISTS,
    SET_TOPLIST_CUR_PAGE
} from "@/common/actionType"
import {
    TOPLISTS_URI
} from "@/common/constant"
import {getSonglistAction} from "@/redux/actions/songlist"


export function setToplistCurIdAction (id) {
    return {
        type: SET_TOPLIST_CUR_ID,
        data: id
    }
}
export function setToplistCurPageAction (page) {
    return {
        type: SET_TOPLIST_CUR_PAGE,
        data: page
    }
}
export function getToplistsAction () {
    return dispatch => {
        getRequest(TOPLISTS_URI).then(response => {
            const toplists = response.data.list
            dispatch({
                type: SET_TOPLISTS,
                data: toplists
            })
            for (const toplist of toplists) {
                dispatch(getSonglistAction(toplist.id))
            }
        }).catch(error => console.log(error))
    }
} 