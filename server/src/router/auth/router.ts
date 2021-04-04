import express from "express";
import passport from "passport";
import delay from "@/router/middlewares/delay";
import allowMethods from "@/router/middlewares/allow-methods";

/** @public */
const router = express.Router();

router.route("/self")
	.all(allowMethods("GET", "POST", "DELETE"))
	.all(delay(500)) // let users observe that beautiful gorgeous spinner oh my god what a spinner
	.get((req, res) => {
		if (req.isAuthenticated())
			return res.send(req.user.username);

		if ("nofail" in req.query)
			if (req.query.nofail !== "0" && req.query.nofail !== "false")
				return res.sendStatus(204);

		res.sendStatus(401);
	})
	.post(passport.authenticate("local", {
		successRedirect: "/auth/self",
	}))
	.delete((req, res) => {
		req.logout();
		res.sendStatus(204);
	});

export default router;
