import { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout, Popover } from "antd";
import { SyncOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { getSelf } from "./api/auth";
import type { State } from "./store";
import useAction from "./store/use-action";
import classes from "./app.module.css";
import LoginPage from "./pages/login-page";
import UserPage from "./pages/user-page";
import PrivatePage from "./pages/private-page";
import Navigation from "./components/navigation";
import Breadcrumbs from "./components/breadcrumbs";

/** @private */
const layoutStyle: React.CSSProperties = {
    minHeight: "100%",
};

/** @private */
const red = "#cf1322" as const;

export default function App() {
    const user = useSelector((state: State) => state.user);
    const app = useSelector((state: State) => state.app);

    const userInitialize = useAction("USER$INITIALIZE");
    const userSetUsername = useAction("USER$SET_USERNAME");
    const appSetLoading = useAction("APP$SET_LOADING");
    const appSetError = useAction("APP$SET_ERROR");

    useEffect(() => {
        if (user.initialized) return;

        (async () => {
            appSetError(null);
            appSetLoading(true);

            try {
                const username = await getSelf();

                if (username != null) userSetUsername(username);
            } catch (error) {
                console.error(error);
                appSetError(String(error));
                appSetLoading(false);
                return;
            }

            appSetLoading(false);
            userInitialize();
        })();
    }, [
        user,
        appSetLoading,
        appSetError,
        userSetUsername,
        userInitialize,
    ]);

    return (
        <BrowserRouter>
            <Layout style={layoutStyle}>
                <Layout.Header>
                    <Navigation disabled={app.loading || !user.initialized} />
                </Layout.Header>
                <Layout.Content className={classes.Content}>
                    {app.loading ? (
                        <SyncOutlined spin className={classes.OverlayIcon} />
                    ) : app.error != null ? (
                        <Popover content={app.error}>
                            <ExclamationCircleOutlined
                                className={classes.OverlayIcon}
                                style={{ color: red }}
                            />
                        </Popover>
                    ) : !user.initialized ? (
                        <Popover content="User initialization error">
                            <ExclamationCircleOutlined
                                className={classes.OverlayIcon}
                                style={{ color: red }}
                            />
                        </Popover>
                    ) : (
                        <>
                            <Breadcrumbs />
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to="/user" />
                                </Route>
                                <Route path="/login">
                                    <LoginPage />
                                </Route>
                                <Route path="/user">
                                    <UserPage />
                                </Route>
                                <Route path="/private">
                                    <PrivatePage />
                                </Route>
                            </Switch>
                        </>
                    )}
                </Layout.Content>
            </Layout>
        </BrowserRouter>
    );
}
