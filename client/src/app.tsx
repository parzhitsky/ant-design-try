import type React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import classes from "./app.module.css";
import PublicPage from "./pages/public-page";
import PrivatePage from "./pages/private-page";
import Navigation from "./components/navigation";
import Breadcrumbs from "./components/breadcrumbs";

/** @private */
const layoutStyle: React.CSSProperties = {
  minHeight: "100%",
};

export default function App() {
  return (
    <BrowserRouter>
      <Layout style={layoutStyle}>
        <Layout.Header>
          <Navigation />
        </Layout.Header>
        <Layout.Content className={classes.Content}>
          <Breadcrumbs />
          <Switch>
            <Route exact path="/">
              <Redirect to="/public" />
            </Route>
            <Route path="/public">
              <PublicPage />
            </Route>
            <Route path="/private">
              <PrivatePage />
            </Route>
          </Switch>
        </Layout.Content>
      </Layout>
    </BrowserRouter>
  );
}
