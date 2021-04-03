import { useCallback } from "react";
import { useDispatch } from "react-redux";
import type * as app from "./app/types";

/** @private */
type PayloadMap =
	& app.PayloadMap
	;

/** @private */
type ActionType =
	| keyof app.PayloadMap
	;

/** @private */
type Params<Type extends ActionType> = PayloadMap[Type] extends never ? (
	readonly []
) : (
	readonly [ payload: PayloadMap[Type] ]
);

/** @private */
interface Dispatcher<Type extends ActionType> {
	(...args: Params<Type>): void;
}

export default function useAction<Type extends ActionType>(type: Type): Dispatcher<Type> {
	const dispatch = useDispatch();

	return useCallback((...args): void => {
		dispatch(args.length === 1 ? {
			type,
			payload: args[0],
		} : {
			type,
		});
	}, [ dispatch, type ]);
}
