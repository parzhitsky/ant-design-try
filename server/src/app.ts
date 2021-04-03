import express from "express";
import cors from "cors";
import router from "./router";
import auth from "./auth";

/** @public */
const app = express();

app.use(cors({
	origin: "*",
	maxAge: 1000 * 60 * 60, // one hour
}));

app.use(auth());

app.use(router);

export default app;
