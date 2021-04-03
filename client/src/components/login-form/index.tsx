import { Form, Button } from "antd";
import LoginFormUsernameField from "./login-form-username-field";
import LoginFormPasswordField from "./login-form-password-field";

/** @private */
interface Values {
	username: string;
	password: string;
}

/** @private */
interface Props {
	onValues(values: Values): void;
}

export default function LoginForm({
	onValues,
}: Props) {
	return (
		<Form name="login" onFinish={onValues}>
			<LoginFormUsernameField name="username" />
			<LoginFormPasswordField name="password" />
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
}
