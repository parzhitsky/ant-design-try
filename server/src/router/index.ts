import express from "express";

/** @public */
const router = express.Router();

router.route("/")
	.get((req, res) => {
		res.send("Hello world!");
	});

export default router;
