import { combineReducers, createStore } from "redux";

import type { State as AppState } from "./app/types";
import type { State as UserState } from "./user/types";
import appReducer from "./app/reducer";
import userReducer from "./user/reducer";

export interface State {
	app: AppState;
	user: UserState;
}

export default createStore(combineReducers({
	app: appReducer,
	user: userReducer,
}));
