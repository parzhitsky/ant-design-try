import type { RequestHandler } from "express";
import { METHODS } from "http";

/** @private */
const all = new Set(METHODS);

export default function allowMethods(...methods: string[]): RequestHandler {
	const allowed = new Set(methods);

	for (const method of allowed)
		if (!all.has(method))
			throw new Error(`Unknown method encountered: "${method}" (see 'require("http").METHODS' for known methods)`);

	const headers = {
		'Allow': Array.from(allowed),
	} as const;

	return (req, res, next) => {
		if (allowed.has(req.method))
			return next();

		res.header(headers).sendStatus(405);
	};
}
