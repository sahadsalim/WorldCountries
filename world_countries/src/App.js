import React, { Suspense, lazy, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setCountry } from "./redux/actions";
import store from "./redux/store";
import Profile from "./component/auth/profile";
import Protected from "./config/protected-routes";
const Home = lazy(() => import("./component/layout/home"));
const Login = lazy(() => import("./component/auth/login"));
const SignUp = lazy(() => import("./component/auth/signup"));
const Favorites =lazy(() =>import("./component/layout/favorites"));
const App = (data) => {
  let [countries,setCountries]=useState([]);
  let [loged,isLogged]=useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    getCountryList().then((items) => {
      if (mounted) {
        const data = dispatch(setCountry(items.countries));
      }
    });
    return () => (mounted = false);
  },[]);
  store.subscribe(()=>{
    setCountries(store.getState().country)
    isLogged(store.getState().auth.isLogged)
  })

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<Login />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/home" element={
              <Protected isLoggedIn={loged} >{
                <Home countries={countries} />}
              </Protected>
            }/>
            <Route path="/fav" element={
              <Protected isLoggedIn={loged} >{
                <Favorites countries={countries} />}
              </Protected>
            }/>
            <Route path="/profile" element={
              <Protected isLoggedIn={loged} >{
                <Profile />}
              </Protected>
            }/>
          </Routes>
        </Router>
      </Suspense>
      <div id="portal"></div>
    </div>
  );
};
export default App;
export const getCountryList = () => {
  return fetch(
    "https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/countries?f=pjson"
  ).then((data) => data.json());
};