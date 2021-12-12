import React, { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { Login } from "../components/pages/Login";
import { homeRoutes } from "../router/HomeRoutes";
import { Page404 } from "../components/pages/Page404";
import { LoginUserProvider } from "../providers/LoginUserProvider";
import { Register } from "../components/pages/Register";

export const Router: VFC = memo(() => {
  return (
    <Switch>
      <LoginUserProvider>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route
          path="/home"
          render={({ match: { url } }) => (
            <Switch>
              {homeRoutes.map((route) => (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={`${url}${route.path}`}
                >
                  <HeaderLayout>{route.children}</HeaderLayout>
                </Route>
              ))}
            </Switch>
          )}
        />
      </LoginUserProvider>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
});
