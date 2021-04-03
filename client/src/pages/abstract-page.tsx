import type React from "react";
import { useEffect } from "react";
import useAction from "../store/use-action"; // TODO: add path aliases

/** @private */
interface Props {
	breadcrumbItem: string;
	children?: React.ReactNode;
}

export default function AbstractPage({
	breadcrumbItem,
	children = null,
}: Props) {
	const breadcrumbsPush = useAction("APP$BREADCRUMBS_PUSH");
	const breadcrumbsPop = useAction("APP$BREADCRUMBS_POP");

	useEffect(() => {
		breadcrumbsPush(breadcrumbItem);

		return breadcrumbsPop;
	}, [ breadcrumbItem, breadcrumbsPush, breadcrumbsPop ]);

	return children as React.ReactElement;
}
