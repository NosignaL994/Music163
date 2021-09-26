import { SET_HOT_RADIOS } from "@/common/actionType"
import {getRequest} from "@/utils/request"

export function getHotRadioAction () {
    return dispatch => getRequest('/dj/hot').then(response => dispatch({
        type: SET_HOT_RADIOS,
        data: response.data.djRadios
    })).catch(error => console.log(error))
}