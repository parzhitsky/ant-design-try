export interface State {
	initialized: boolean;
	username: string | null;
}

export interface PayloadMap {
	USER$INITIALIZE: never;
	USER$SET_USERNAME: string | null;
}
