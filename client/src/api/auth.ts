import request from "./request"; // TODO: add path aliases

export async function getSelf(): Promise<string | null> {
	const response = await request("GET", "/auth/self?nofail");

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
	return request("POST", "/auth/self", { username, password });
}

export async function logout(): Promise<void> {
	await request("DELETE", "/auth/self");
}
