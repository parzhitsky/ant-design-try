export interface State {
	breadcrumbs: string[];
	loading: boolean;
	error: string | null;
}

export interface PayloadMap {
	APP$BREADCRUMBS_POP: never;
	APP$BREADCRUMBS_PUSH: string;
	APP$SET_LOADING: boolean;
	APP$SET_ERROR: string;
	APP$CLEAR_ERROR: never;
}
