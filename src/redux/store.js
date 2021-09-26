import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk'

import reducer from "@/redux/reducers/index"
export const store = createStore(reducer, applyMiddleware(thunk))