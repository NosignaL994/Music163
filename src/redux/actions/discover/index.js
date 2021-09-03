import {getRequest} from "@/utils/request"
import { GET_BANNER_OVER, GET_HOTRECOMMEND_OVER,GET_TOPLIST_OVER,GET_RECOMMEND_NEW_OVER,GET_RISING_TOPLIST_OVER, GET_NEW_TOPLIST_OVER, GET_ORIGINAL_TOPLIST_OVER,GET_RECOMMEND_SINGER_OVER,GET_RECOMMEND_ANCHOR_OVER } from "@/common/actionType"
import { risingToplistId, newToplistId, originalToplistId } from "@/common/constant"

// function errorHander (error) {
//     if (error.response) {
//         console.log(error)
//     } else {

//     }
// }

export const getBannerAction = () => dispatch => {
    getRequest('/banner')
    .then(response => dispatch({
            type: GET_BANNER_OVER,
            data: response.data.banners
        }))
    .catch(error => console.log(error))
}

// export const changeBannerAction = currentIdx => ({
//     type: CHANGE_BANNER,
//     data: currentIdx
// })

export const getHotRecommendAction = () => dispatch => {
    getRequest('/personalized', {
        limit: 8
    })
    .then(response => dispatch({
            type: GET_HOTRECOMMEND_OVER,
            data: response.data.result
        }))
    .catch(error => console.log(error))
}

export const getRecommendNewAction = () => dispatch => {
    getRequest('/album/newest')
    .then(response => dispatch({
        type: GET_RECOMMEND_NEW_OVER,
        data: response.data.albums
    }))
    .catch(error => console.log(error))
}
export const getRecommendToplistAction = () => dispatch => {
    getRequest('/playlist/detail', {
        id: risingToplistId
    }).then(response => dispatch({
        type: GET_RISING_TOPLIST_OVER,
        data: response.data.playlist
    })).catch(error => console.log(error))

    getRequest('/playlist/detail', {
        id: newToplistId
    }).then(response => dispatch({
        type: GET_NEW_TOPLIST_OVER,
        data: response.data.playlist
    })).catch(error => console.log(error))

    getRequest('/playlist/detail', {
        id: originalToplistId
    }).then(response => dispatch({
        type: GET_ORIGINAL_TOPLIST_OVER,
        data: response.data.playlist
    })).catch(error => console.log(error))
}
export const getToplistAction = () => dispatch => {
    getRequest('/toplist')
    .then(response => dispatch({
        type: GET_TOPLIST_OVER,
        data: response.data.list
    }))
    .catch(error => console.log(error))
}

export const getRecommendSingerAction = () => dispatch => getRequest('/top/artists', {
    limit: 5
})
    .then(response => dispatch({
        type: GET_RECOMMEND_SINGER_OVER,
        data: response.data.artists
    }))
    .catch(error => console.log(error))

export const getRecommendAnchorAction = () => dispatch => getRequest('/dj/toplist', {
    limit: 5
}).then(response => dispatch({
    type: GET_RECOMMEND_ANCHOR_OVER,
    data: response.data.toplist
})).catch(error => console.log(error))