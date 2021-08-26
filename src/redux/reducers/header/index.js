
import {Map} from "immutable"

import {GET_SEARCH_SUGGEST,SEARCH_IPT, SEARCH_FOCUS_CHANGE} from "@/common/actionType"


const defaultState = Map({
    searchSuggest: {},
    searchValue: "",
    searchFocused: false
})

export default function reducer (state = defaultState, action) {
    const {type, data} = action
    
    switch (type) {
        case GET_SEARCH_SUGGEST : 
            return state.set('searchSuggest', data)
        case SEARCH_IPT : 
            return state.set('searchValue', data)
        case SEARCH_FOCUS_CHANGE :
            return state.set('searchFocused', data)
        default :
            return state
    }
}

