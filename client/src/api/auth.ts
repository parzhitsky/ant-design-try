/** @private */
const SERVER_ORIGIN = "http://localhost:8081/";

/** @private */
const authUrl = new URL("/auth/self", SERVER_ORIGIN).href;

/** @private */
const authUrlNoFail = new URL("?nofail", authUrl).href;

export async function getSelf(): Promise<string | null> {
	const response = await fetch(authUrlNoFail, {
		credentials: "include",
	});

	if (!response.ok)
		throw new Error(response.statusText);

	if (!response.status.toString().startsWith("20")) {
		console.warn(response);
		throw new Error("Unexpected server response");
	}

	if (response.status === 200)
		return response.text();

	return null;
}

export async function login(username: string, password: string): Promise<Response> {
	return fetch(authUrl, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ username, password }),
		credentials: "include",
	});
}

export async function logout(): Promise<void> {
	await fetch(authUrl, {
		method: "DELETE",
		credentials: "include",
	});
}