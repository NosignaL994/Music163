import { SET_HOT_RADIOS } from "@/constant"
import request from "@/utils/request"

export function getHotRadioAction () {
    return dispatch => request.get('/dj/hot')
        .then(data => dispatch({
            type: SET_HOT_RADIOS,
            data: data.djRadios
        }))
}