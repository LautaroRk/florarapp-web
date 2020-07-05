import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";

import Home from "./core/Home";
import Signin from "./user/Signin";
import UserDashboard from "./user/UserDashboard";

import AdminDashboard from "./user/AdminDashboard";

import Auctions from "./admin/Auctions";
import NewAuction from "./admin/NewAuction";
import Users from "./admin/Users";
import User from "./admin/User";
import Signup from "./user/Signup";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>

        {/* Rutas comunes */}
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />

        {/* Rutas de usuario cliente logueado */}
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />

        {/* Rutas de admin */}
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/users" exact component={Users} />
        <AdminRoute path="/user" exact component={User} />
        <AdminRoute path="/signup" exact component={Signup} />
        <AdminRoute path="/auctions" exact component={Auctions} />
        <AdminRoute path="/create/auction" exact component={NewAuction} />
      
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
