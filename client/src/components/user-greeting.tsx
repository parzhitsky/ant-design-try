import { Typography } from "antd";

/** @private */
interface Props {
	username: string;
}

export default function UserGreeting({ username }: Props) {
	return (
		<>
			<Typography.Title level={3}>
				Welcome!
			</Typography.Title>
			<Typography.Paragraph>
				Logged in as <Typography.Text code>{username}</Typography.Text>
			</Typography.Paragraph>
		</>
	);
}