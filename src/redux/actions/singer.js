import { ADD_SINGER } from "@/common/actionType"
import { getSingerDetail } from "@/utils/request"
export function getSingerDetailAction (id) {
    return dispatch => getSingerDetail(id).then(result => {
        // console.log(result);
        dispatch({
        type: ADD_SINGER,
        data: result
    })}).catch(error => console.log(error))
}