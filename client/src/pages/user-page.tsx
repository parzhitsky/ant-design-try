import { Row, Col } from "antd";
import { useSelector } from "react-redux";
import type { State } from "@/store";
import AbstractPage from "./abstract-page";
import LogoutButton from "@/components/logout-button";
import UserGreeting from "@/components/user-greeting";

export default function UserPage() {
	const user = useSelector((state: State) => state.user);

	return (
		<AbstractPage authed breadcrumbItem="User">
			<Row justify="center">
				<Col xs={18} sm={14} md={10} xl={6}>
					<Row>
						<Col span={24}>
							<UserGreeting username={user.username!} />
						</Col>
						<Col span={24}>
							<LogoutButton />
						</Col>
					</Row>
				</Col>
			</Row>
		</AbstractPage>
	);
}
