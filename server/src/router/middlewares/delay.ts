import type { RequestHandler } from "express";

/** @public */
const delay = (msec: number): RequestHandler => (req, res, next) => setTimeout(next, msec);

export default delay;
