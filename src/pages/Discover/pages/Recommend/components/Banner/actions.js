import request from "@/utils/request"
import { SET_BANNERS } from "@/constant"


export function getBannerAction () {
    return dispatch => request.get('/banner')
    .then(data => dispatch({
            type: SET_BANNERS,
            data: data.banners
        }))
}
