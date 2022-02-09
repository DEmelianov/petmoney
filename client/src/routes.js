import React from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import Accounts from "./pages/Accounts";
import Categories from "./pages/Categories";
import Transactions from "./pages/Transactions";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import Page404 from "./pages/Page404";

export const useRoutes = isAuth => {
  if (isAuth) {
    return (
      <Routes>
        <Route path="/accounts" element={<Accounts/>}/>
        <Route path="/categories" element={<Categories/>}/>
        <Route path="/transactions" element={<Transactions/>}/>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="*" element={<Page404/>}/>
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="*" element={<Navigate to="/auth"/>}/>
    </Routes>
  )
}