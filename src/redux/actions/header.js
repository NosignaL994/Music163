

import {SEARCH_SUGGEST_URL} from '@/common/constant'
import {GET_SEARCH_SUGGEST, SEARCH_IPT, SEARCH_FOCUS_CHANGE} from "@/common/actionType"
import { getRequest } from '@/utils/request'

export const searchIptAction = iptValue => ({
    type: SEARCH_IPT,
    data: iptValue
})

export const getSearchSuggestAction = iptValue => dispatch => {
    const params = {
        keywords: iptValue
    }
    
    getRequest(SEARCH_SUGGEST_URL, params)
    .then(response => dispatch({
        type: GET_SEARCH_SUGGEST,
        data: response.data.result
    }))

    // .then(response => console.log(response.data.result))
    .catch(error => console.log(error))
}

export const searchFocusChangeAction = bool => ({
    type: SEARCH_FOCUS_CHANGE,
    data: bool
})