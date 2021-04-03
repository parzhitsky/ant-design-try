import { Form, Input } from "antd";
import type { Rule } from "rc-field-form/lib/interface";

/** @private */
const rules: Rule[] = [
	{
		required: true,
		message: "Password cannot be empty!"
	},
];

/** @private */
interface Props {
	name: string;
}

export default function LoginFormPasswordField({
	name,
}: Props) {
	return (
		<Form.Item
			name={name}
			rules={rules}
			label="Password"
		>
			<Input.Password />
		</Form.Item>
	);
}
