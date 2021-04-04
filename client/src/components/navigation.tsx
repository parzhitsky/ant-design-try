import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu } from "antd";
import type { State } from "@/store";

/** @private */
type ShowMode =
	| "auth"
	| "no-auth"
	;

/** @private */
interface Item {
	path: string;
	label: string;
	showMode?: ShowMode;
}

/** @private */
const items: Item[] = [
	{
		path: "/login",
		label: "Login page",
		showMode: "no-auth",
	},
	{
		path: "/user",
		label: "User page",
		showMode: "auth",
	},
	{
		path: "/private",
		label: "Private page",
	},
];

/** @private */
interface Props {
	disabled?: boolean;
}

export default function Navigation({ disabled = false }: Props) {
	const { pathname } = useLocation();
	const { username } = useSelector((state: State) => state.user);

	const mode: ShowMode = username !== "" ? "auth" : "no-auth";
	const shown = items.filter(({ showMode }) => (
		showMode == null || showMode === mode
	));

	return (
		<Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
			{shown.map((item) => (
				<Menu.Item key={item.path} disabled={disabled}>
					<Link to={item.path}>{item.label}</Link>
				</Menu.Item>
			))}
		</Menu>
	);
}
