import { useState } from "react";
import { Button } from "antd";
import config from "../config"; // TODO: add path aliases
import useAction from "../store/use-action"; // TODO: add path aliases

/** @private */
const AUTH_URL = new URL("/auth/self", config.serverOrigin).href;

/** @private */
interface Props {
	onLogout(): void;
}

export default function LogoutButton({
	onLogout,
}: Props) {
	const [ loading, setLoading ] = useState(false);

	const appSetError = useAction("APP$SET_ERROR");

	return (
		<Button
			type="primary"
			loading={loading}
			onClick={async () => {
				setLoading(true);

				try {
					await fetch(AUTH_URL, { method: "DELETE" });
				} catch (error) {
					console.error(error);
					appSetError(String(error));
					return;
				}

				setLoading(false);
				onLogout();
			}}
		>
			Log out
		</Button>
	);
}