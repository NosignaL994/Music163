import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

import reducer from "@/service/reducers/index"
export const store = createStore(reducer, applyMiddleware(thunk))