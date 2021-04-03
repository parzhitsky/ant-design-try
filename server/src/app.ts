import express from "express";
import session from "express-session";
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

app.use(session({
	secret: process.env.EXPRESS_SESSION_SECRET as string,
	resave: false,
	saveUninitialized: false,
	cookie: {
		maxAge: HOUR,
	},
}));

app.use(auth());

app.use("/", router);

export default app;
