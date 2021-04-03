import type { ActionFrom } from "@parzh/typed-redux-actions";
import type { State, PayloadMap } from "./types";

/** @private */
type ActionType = keyof PayloadMap;

/** @private */
type Action<Type extends ActionType = ActionType> = ActionFrom<PayloadMap, Type>;

/** @private */
const initial: State = {
	breadcrumbs: [ "Home" ],
	loading: true,
	error: null,
};

export default function reducer(state = initial, action: Action): State {
	switch (action.type) {
		case "APP$BREADCRUMBS_POP":
			return { ...state, breadcrumbs: state.breadcrumbs.slice(0, -1) };

		case "APP$BREADCRUMBS_PUSH":
			return { ...state, breadcrumbs: state.breadcrumbs.concat(action.payload) };

		case "APP$SET_LOADING":
			return { ...state, loading: action.payload };

		case "APP$SET_ERROR":
			return { ...state, error: action.payload };

		case "APP$CLEAR_ERROR":
			return { ...state, error: null };

		default:
			return state;
	}
}
