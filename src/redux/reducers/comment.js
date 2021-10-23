import { Map } from "immutable";
import {
    ADD_SONGLIST_NEW_COMMENT,
    ADD_SONGLIST_HOT_COMMENT,
    SWITCH_LIKE_COMMENT
} from "@/common/actionType"
const defaultState = Map({
    songlist: {
        
    }
})
export default function reducer (state=defaultState, action) {
    const {type, data} = action
    switch (type) {
        case ADD_SONGLIST_NEW_COMMENT:
            // console.log(data);
            return state.mergeDeep({
                songlist:{[data.id]: {
                    new:data.comments
                }}
            })
        case ADD_SONGLIST_HOT_COMMENT:
            // console.log(data);
            return state.mergeDeep({
                songlist:{[data.id]: {
                    total: data.comments.data.totalCount,
                    hot: data.comments.data.comments
                }}
            })
        case SWITCH_LIKE_COMMENT:
            const comment = state.getIn(data.keys)[data.index]
            const likedCount = comment.likedCount + (comment.liked ? -1 : 1)
            return state.mergeIn([...data.keys,data.index], {
                likedCount,
                liked:!comment.liked
            })
        default:
            return state
    }
}