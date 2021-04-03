import express from "express";
import cors from "cors";
import router from "./router";
import auth from "./auth";

/** @private */
const HOUR = 3_600_000;

/** @public */
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
	origin: "*",
	maxAge: HOUR,
}));

app.use(auth());

app.use("/", router);

export default app;
