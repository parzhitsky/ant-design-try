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
