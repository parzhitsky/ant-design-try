import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import type { State } from "@/store";
import useAction from "@/store/use-action";
import AbstractPage from "./abstract-page";
import LoginForm from "@/components/login-form";

export default function LoginPage() {
	const loggedIn = useSelector((state: State) => (
		state.user.initialized && state.user.username !== ""
	));

	const userSetUsername = useAction("USER$SET_USERNAME");

	if (loggedIn)
		return <Redirect to="/user" />;

	return (
		<AbstractPage breadcrumbItem="Login">
			<Row justify="center">
				<Col xs={18} sm={14} md={10} xl={6}>
					<LoginForm
						onLogin={(username) => userSetUsername(username)}
					/>
				</Col>
			</Row>
		</AbstractPage>
	);
}
