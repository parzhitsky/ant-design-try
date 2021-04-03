import { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Layout, Popover } from "antd";
import { SyncOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import type { State } from "./store";
import useAction from "./store/use-action";
import config from "./config";
import classes from "./app.module.css";
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

/** @private */
const AUTH_URL = new URL("/auth/self?nofail", config.serverOrigin).href;

export default function App() {
  const userInitialized = useSelector((state: State) => state.user.initialized);
  const appError = useSelector((state: State) => state.app.error);
  const userInitialize = useAction("USER$INITIALIZE");
  const userSetUsername = useAction("USER$SET_USERNAME");
  const appSetError = useAction("APP$SET_ERROR");
  const appClearError = useAction("APP$CLEAR_ERROR");

  useEffect(() => {
    if (userInitialized) return;

    (async () => {
      appClearError();

      let response: Response;

      try {
        response = await fetch(AUTH_URL);

        if (!response.ok)
          throw new Error(response.statusText);

        if (!response.status.toString().match(/20\d/)) {
          throw new Error("Unexpected server response");
        }
      } catch (error) {
        console.error(response!);
        return appSetError((error as Error).message);
      }

      if (response.status === 200)
        userSetUsername(await response.text());

      userInitialize();
    })();
  }, [
    userInitialized,
    appClearError,
    appSetError,
    userInitialize,
    userSetUsername,
  ]);

  return (
    <BrowserRouter>
      <Layout style={layoutStyle}>
        <Layout.Header>
          <Navigation disabled={!userInitialized} />
        </Layout.Header>
        <Layout.Content className={classes.Content}>
          {
            appError != null ? (
              <Popover content={appError}>
                <ExclamationCircleOutlined
                  className={classes.OverlayIcon}
                  style={{ color: red }}
                  title={appError}
                />
              </Popover>
            ) : !userInitialized ? (
              <SyncOutlined spin className={classes.OverlayIcon} />
            ) : (
              <>
              <Breadcrumbs />
              <Switch>
                <Route exact path="/">
                  <Redirect to="/user" />
                </Route>
                <Route path="/user">
                  <UserPage />
                </Route>
                <Route path="/private">
                  <PrivatePage />
                </Route>
              </Switch>
              </>
            )
          }
        </Layout.Content>
      </Layout>
    </BrowserRouter>
  );
}
