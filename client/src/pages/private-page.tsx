import { Row, Col, Typography } from "antd";
import AbstractPage from "./abstract-page";

export default function PrivatePage() {
	return (
		<AbstractPage authed breadcrumbItem="Private">
			<Row justify="center">
				<Col span={16}>
					<Typography.Title level={3}>
						Private page
					</Typography.Title>
					<Typography.Paragraph>
						The content of this page is available only to logged-in users. 🤫
					</Typography.Paragraph>
					<Typography.Paragraph>
						If you can see this message, you are logged-in, congratulations! 🎉🥳
					</Typography.Paragraph>
				</Col>
			</Row>
		</AbstractPage>
	);
}
