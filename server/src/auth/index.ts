import passport from "passport";
import strategy from "./strategy";
import users, { User as AppUser, Username } from "./users";

declare global {
	namespace Express {
		interface User extends AppUser {}
	}
}

passport.use(strategy);

passport.serializeUser((user, done) => {
	done(null, user.username);
});

passport.deserializeUser((username: Username, done) => {
	done(null, users[username]);
});

export default () => [
	passport.initialize(),
	passport.session()
];
