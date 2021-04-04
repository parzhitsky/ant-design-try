import { useState } from "react";
import { Form, Button, Row, Col, Typography } from "antd";
import { login } from "@/api/auth";
import useAction from "@/store/use-action";
import LoginFormUsernameField from "./login-form-username-field";
import LoginFormPasswordField from "./login-form-password-field";

/** @private */
interface Values {
	username: string;
	password: string;
}

/** @private */
interface Props {
	onLogin(username: string): void;
}

export default function LoginForm({
	onLogin,
}: Props) {
	const [ error, setError ] = useState("");
	const [ loading, setLoading ] = useState(false);

	const appSetError = useAction("APP$SET_ERROR");
	
	return (
		<Form
			name="login"
			onFinish={async (values: Values) => {
				setError("");
				setLoading(true);

				let response!: Response;

				try {
					response = await login(values.username, values.password);
				} catch (error) {
					console.warn(response);
					console.error(error);
					appSetError(String(error));
					return;
				} finally {
					setLoading(false);
				}

				if (!response.ok)
					return setError("Invalid username or password!");

				onLogin(values.username);
			}}
		>
			<LoginFormUsernameField name="username" />
			<LoginFormPasswordField name="password" />
			<Form.Item>
				<Button type="primary" htmlType="submit" loading={loading}>
					Submit
				</Button>
			</Form.Item>
			{error && (
				<Row justify="center">
					<Col>
						<Typography.Text type="danger">{error}</Typography.Text>
					</Col>
				</Row>
			)}
		</Form>
	);
}
