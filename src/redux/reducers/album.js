import {Map, List} from "immutable"
import {
    ADD_ALBUM,
    SET_NEW_ALBUMS
} from "@/common/actionType"

const defaultState = Map({
    albums: Map({}),
    newList: List([])
})

export default function reducer (state=defaultState, action) {
    const {type,data} = action
    switch (type) {
        case ADD_ALBUM:
            return state.setIn(["albums",data.id],data)
        case SET_NEW_ALBUMS:
            return state.mergeIn(["newList"],data)
        default:
            return state
    }
}