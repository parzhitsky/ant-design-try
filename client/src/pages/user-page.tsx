import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import type { State } from "../store"; // TODO: add path aliases
import useAction from "../store/use-action";
import AbstractPage from "./abstract-page";
import LoginForm from "../components/login-form"; // TODO: add path aliases
import LogoutButton from "../components/logout-button"; // TODO: add path aliases
import UserGreeting from "../components/user-greeting"; // TODO: add path aliases

export default function UserPage() {
	const user = useSelector((state: State) => state.user);
	const userSetUsername = useAction("USER$SET_USERNAME");

	return (
		<AbstractPage breadcrumbItem="User">
			<Row justify="center">
				<Col xs={18} sm={14} md={10} xl={6}>
					{!!user.username ? (
						<>
							<Row>
								<Col span={24}>
									<UserGreeting username={user.username} />
								</Col>
								<Col span={24}>
									<LogoutButton
										onLogout={() => userSetUsername("")}
									/>
								</Col>
							</Row>
						</>
					) : (
						<LoginForm
							onLogin={(username) => userSetUsername(username)}
						/>
					)}
				</Col>
			</Row>
		</AbstractPage>
	);
}
