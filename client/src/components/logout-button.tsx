import { useState } from "react";
import { Button } from "antd";
import { logout } from "@/api/auth";
import useAction from "@/store/use-action";

export default function LogoutButton() {
	const [ loading, setLoading ] = useState(false);

	const appSetError = useAction("APP$SET_ERROR");
	const userSetUsername = useAction("USER$SET_USERNAME");

	return (
		<Button
			type="primary"
			loading={loading}
			onClick={async () => {
				setLoading(true);

				try {
					await logout();
				} catch (error) {
					console.error(error);
					appSetError(String(error));
					return;
				} finally {
					setLoading(false);
				}

				userSetUsername(null);
			}}
		>
			Log out
		</Button>
	);
}