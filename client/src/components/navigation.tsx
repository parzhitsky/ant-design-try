import { Link } from "react-router-dom";
import { Menu } from "antd";

export default function Navigation() {
	return (
		<Menu theme="dark" mode="horizontal">
			<Menu.Item>
				<Link to="/user">User page</Link>
			</Menu.Item>
			<Menu.Item>
				<Link to="/private">Private page</Link>
			</Menu.Item>
		</Menu>
	);
}
