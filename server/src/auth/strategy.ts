import { Strategy } from "passport-local";
import users, { isUsername } from "./users";

/** @public */
const strategy = new Strategy((username, password, done) => {
	if (!isUsername(username))
		return done(null, null, { message: `User "${username}" is not found` });

	const user = users[username];

	if (user.password !== password)
		return done(null, null, { message: `Passwords did not match` });

	done(null, user);
});

export default strategy;
