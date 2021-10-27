

import {
    SEARCH_SUGGEST_URL,
    GET_SEARCH_SUGGEST,
    SEARCH_IPT,
    SEARCH_FOCUS_CHANGE
} from '@/constant'
import request from '@/utils/request'
export const searchIptAction = iptValue => ({
    type: SEARCH_IPT,
    data: iptValue
})

export const getSearchSuggestAction = iptValue => dispatch => {
    const params = {
        keywords: iptValue
    }
    
    request.get(SEARCH_SUGGEST_URL, params)
    .then(data => dispatch({
        type: GET_SEARCH_SUGGEST,
        data: data.result
    }))
}

export const searchFocusChangeAction = bool => ({
    type: SEARCH_FOCUS_CHANGE,
    data: bool
})

