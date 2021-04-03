import { combineReducers, createStore } from "redux";

import type { State as AppState } from "./app/types";
import appReducer from "./app/reducer";

export interface State {
	app: AppState;
}

export default createStore(combineReducers({
	app: appReducer,
}));
