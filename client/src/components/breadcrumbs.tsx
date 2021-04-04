import { useSelector } from "react-redux";
import { Breadcrumb } from "antd";
import type { State } from "@/store";

export default function Breadcrumbs() {
	const items = useSelector((state: State) => state.app.breadcrumbs);

	return (
		<Breadcrumb>
			{items.map((item) => (
				<Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
			))}
		</Breadcrumb>
	);
}
