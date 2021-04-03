import { Link, useLocation } from "react-router-dom";
import { Menu } from "antd";

/** @private */
const items = [
	{
		path: "/user",
		label: "User page",
	},
	{
		path: "/private",
		label: "Private page",
	},
] as const;

export default function Navigation() {
	const { pathname } = useLocation<{}>();

	return (
		<Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
			{items.map((item) => (
				<Menu.Item key={item.path}>
					<Link to={item.path}>{item.label}</Link>
				</Menu.Item>
			))}
		</Menu>
	);
}
