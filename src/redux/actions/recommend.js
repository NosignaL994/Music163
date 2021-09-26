import {
    getRequest
    } from "@/utils/request"
import { 
    SET_BANNERS
} from "@/common/actionType"


import { getSingerDetailAction } from "./singer"

export const getBannerAction = () => dispatch => {
    getRequest('/banner')
    .then(response => dispatch({
            type: SET_BANNERS,
            data: response.data.banners
        }))
    .catch(error => console.log(error))
}











// RcmdPersonal
// export function getPersonalSongListAction () {
//     // const cookie = getCookie()
//     return dispatch => getWithCookie("/recommend/resource").then(response => dispatch({
//         type: SET_RCMD_SONGLIST,
//         data: response.data.recommend
//     }))
// }
