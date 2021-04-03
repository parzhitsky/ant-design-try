import express from "express";
import passport from "passport";
import allowMethods from "@/router/middlewares/allow-methods";

/** @public */
const router = express.Router();

router.route("/self")
	.all(allowMethods("GET", "POST", "DELETE"))
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
