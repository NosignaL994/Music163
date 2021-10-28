import request from "@/utils/request"
import {
    SET_TOPLIST_CUR_ID,
    SET_TOPLISTS,
    SET_TOPLIST_CUR_PAGE,
    TOPLISTS_URI
} from "@/constant"
import {getSonglistAction} from "@/service/actions/songlist"


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
        request.get(TOPLISTS_URI).then(data => {
            const toplists = data.list
            dispatch({
                type: SET_TOPLISTS,
                data: toplists
            })
            for (const toplist of toplists) {
                dispatch(getSonglistAction(toplist.id))
            }
        })
    }
} 