import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Layout } from "antd";
import PublicPage from "./pages/public-page";
import PrivatePage from "./pages/private-page";
import Navigation from "./components/navigation";
import Breadcrumbs from "./components/breadcrumbs";

function App() {
  return (
    <BrowserRouter>
      <Layout style={{ minHeight: "100%" }}>
        <Layout.Header>
          <Navigation />
        </Layout.Header>
        <Layout.Content>
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

export default App;
