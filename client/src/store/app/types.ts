export interface State {
	breadcrumbs: string[];
	error: string | null;
}

export interface PayloadMap {
	APP$BREADCRUMBS_POP: never;
	APP$BREADCRUMBS_PUSH: string;
	APP$SET_ERROR: string;
	APP$CLEAR_ERROR: never;
}
