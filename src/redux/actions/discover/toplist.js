// import {getRequest} from "@/utils/request"
// import {SET_TOPLIST_LIST} from "@/common/actionType"

// export const getToplistListAction = () => dispatch => {
//     getRequest('/toplist')
//     .then(response => {
//         dispatch({
//             type: SET_TOPLIST_LIST,
//             data: response.data.list
//         })
//         return response.data.list
//     })
//     .catch(error => console.log(error))
// }

// export const getToplistAction = (arg) => dispatch => {
//     if (arg instanceof Array) {
//         for (const toplist of arg) {
//             getRequest('/playlist/detail', {
//                 id: toplist.id
//             }).then(response => dispatch({
//                 type: SET_TOPLIST,
//                 data: response.data.list
//             }))
//             .catch(error => console.log(error))
//         }
//     } else {
//         getRequest('/playlist/detail', {
//             id: arg.id
//         }).then(response => dispatch({
//             type: SET_TOPLIST,
//             data: response.data.list
//         }))
//         .catch(error => console.log(error))
//     }
// }