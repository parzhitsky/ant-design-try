import express from "express";
import authRouter from "./auth/router";

/** @public */
const router = express.Router();

router.route("/")
	.get((req, res) => {
		res.send("Hello world!");
	});

router.use("/auth", authRouter);

export default router;
