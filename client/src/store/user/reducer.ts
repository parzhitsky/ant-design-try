import type { ActionFrom } from "@parzh/typed-redux-actions";
import type { State, PayloadMap } from "./types";

/** @private */
type ActionType = keyof PayloadMap;

/** @private */
type Action<Type extends ActionType = ActionType> = ActionFrom<PayloadMap, Type>;

/** @private */
const initial: State = {
	initialized: false,
	username: "",
};

export default function reducer(state = initial, action: Action): State {
	switch (action.type) {
		case "USER$INITIALIZE":
			return { ...state, initialized: true };

		case "USER$SET_USERNAME":
			return { ...state, username: action.payload };

		default:
			return state;
	}
}
