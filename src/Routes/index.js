import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import privateRoutes from "./privateRoutes";
import publicRoutes from "./publicRoutes";
import adminRoutes from "./adminRoutes";
import { Routes } from "./routes";
import PageWithNavbar from "../Components/PageWithNavbar";
import { useAuth } from "../Contexts/AuthContext";

export default function Router() {
  const { user } = useAuth();

  const getClosedRoutes = (routes, checker) => {
    return routes.map((route) => (
      <Route key={route.path} path={route.path} exact={route.exact}>
        {checker ? (
          <PageWithNavbar Page={route.component} />
        ) : (
          <Redirect to={user ? Routes.homePage : Routes.signIn} />
        )}
      </Route>
    ));
  };

  return (
    <BrowserRouter>
      <Switch>
        {publicRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}

        {getClosedRoutes(privateRoutes, user)}
        {getClosedRoutes(adminRoutes, user && user.isAdmin)}

        <Redirect to={user ? Routes.homePage : Routes.signUP} />
      </Switch>
    </BrowserRouter>
  );
}
