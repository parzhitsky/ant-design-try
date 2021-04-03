export interface State {
	breadcrumbs: string[];
}

export interface PayloadMap {
	APP$BREADCRUMBS_POP: never;
	APP$BREADCRUMBS_PUSH: string;
}
