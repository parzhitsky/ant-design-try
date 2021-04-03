import { Form, Input } from "antd";
import type { Rule } from "rc-field-form/lib/interface";

/** @private */
const rules: Rule[] = [
	{
		required: true,
		message: "Username cannot be empty!"
	},
];

/** @private */
interface Props {
	name: string;
}

export default function LoginFormUsernameField({
	name,
}: Props) {
	return (
		<Form.Item
			name={name}
			rules={rules}
			label="Username"
		>
			<Input />
		</Form.Item>
	);
}
