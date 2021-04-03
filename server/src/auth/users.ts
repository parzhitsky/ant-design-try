/** @public */
const users = {
	parzh: {
		username: "parzh",
		password: "parzhPassword0!"
	},
	alice: {
		username: "alice",
		password: "alicePassword1!"
	},
	bob: {
		username: "bob",
		password: "bobPassword2!"
	}
} as const;

export type Username = keyof typeof users;

export function isUsername(input: string): input is Username {
	return input in users;
}

export interface User {
	readonly username: Username;
	readonly password: string;
}

export default users as Record<Username, User>;
