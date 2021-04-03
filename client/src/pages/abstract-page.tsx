import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import type { State } from "../store";
import useAction from "../store/use-action"; // TODO: add path aliases

/** @private */
interface Props {
	breadcrumbItem: string;
	authed?: boolean;
	children?: React.ReactNode;
}

export default function AbstractPage({
	breadcrumbItem,
	authed = false,
	children = null,
}: Props) {
	const loggedIn = useSelector((state: State) => (
		state.user.initialized && state.user.username !== ""
	));

	const breadcrumbsPush = useAction("APP$BREADCRUMBS_PUSH");
	const breadcrumbsPop = useAction("APP$BREADCRUMBS_POP");

	useEffect(() => {
		breadcrumbsPush(breadcrumbItem);

		return breadcrumbsPop;
	}, [ breadcrumbItem, breadcrumbsPush, breadcrumbsPop ]);

	if (!authed || loggedIn)
		return children as React.ReactElement;

	return (
		<Redirect to="/login" />
	);
}
