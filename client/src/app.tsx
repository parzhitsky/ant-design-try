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
  const user = useSelector((state: State) => state.user);
  const app = useSelector((state: State) => state.app);

  const userInitialize = useAction("USER$INITIALIZE");
  const userSetUsername = useAction("USER$SET_USERNAME");
  const appSetLoading = useAction("APP$SET_LOADING");
  const appSetError = useAction("APP$SET_ERROR");
  const appClearError = useAction("APP$CLEAR_ERROR");

  useEffect(() => {
    if (user.initialized) return;

    (async () => {
      appClearError();

      let response: Response;

      try {
        appSetLoading(true);

        response = await fetch(AUTH_URL);

        if (!response.ok)
          throw new Error(response.statusText);

        if (!response.status.toString().match(/20\d/)) {
          throw new Error("Unexpected server response");
        }
      } catch (error) {
        console.error(response!);
        appSetError((error as Error).message);
        appSetLoading(false);
        return;
      }

      if (response.status === 200)
        userSetUsername(await response.text());

      appSetLoading(false);
      userInitialize();
    })();
  }, [
    user,
    appClearError,
    appSetError,
    userSetUsername,
    userInitialize,
    appSetLoading,
  ]);

  return (
    <BrowserRouter>
      <Layout style={layoutStyle}>
        <Layout.Header>
          <Navigation disabled={app.loading || !user.initialized} />
        </Layout.Header>
        <Layout.Content className={classes.Content}>
          {
            app.loading ? (
              <SyncOutlined spin className={classes.OverlayIcon} />
            ) : app.error != null ? (
              <Popover content={app.error}>
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
