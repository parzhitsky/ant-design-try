export interface State {
	initialized: boolean;
	username: string;
}

export interface PayloadMap {
	USER$INITIALIZE: never;
	USER$SET_USERNAME: string;
}
