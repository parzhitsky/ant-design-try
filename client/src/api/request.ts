/** @private */
type Method = "GET" | "POST" | "DELETE";

/** @private */
const SERVER_ORIGIN = "http://localhost:8081/";

/** @private */
const headersForRequestWithJSONBody = {
	"Content-Type": "application/json",
} as const;

/** @internal */
export default async function request(method: Method, pathname: string, body: unknown = null): Promise<Response> {
	const options: RequestInit = {
		method,
		credentials: "include",
	};

	if (body != null) {
		options.headers = headersForRequestWithJSONBody;
		options.body = JSON.stringify(body);
	}

	const { href: url } = new URL(pathname, SERVER_ORIGIN);

	return fetch(url, options);
}
