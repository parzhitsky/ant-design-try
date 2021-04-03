import { useState } from "react";
import { Button } from "antd";
import useAction from "../store/use-action"; // TODO: add path aliases

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
					await fetch("http://localhost:8081/auth/self", {
						method: "DELETE",
						credentials: "include",
					});
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