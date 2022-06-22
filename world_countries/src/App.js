import React, { Suspense, lazy, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCountry } from "./redux/actions";
import store from "./redux/store";
import Profile from "./component/Auth/Profile";
const Home = lazy(() => import("./component/Layout/Home"));
const Login = lazy(() => import("./component/Auth/Login"));
const SignUp = lazy(() => import("./component/Auth/SignUp"));
const Favorites =lazy(() =>import("./component/Layout/Favorites"));
const App = (data) => {
  let [countries,setCountries]=useState([]);
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
  })

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Routes>
            <Route path="/" element={<Home countries={countries} />} />
            <Route path="/home" element={<Home countries={countries} />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/fav" element={<Favorites countries={countries} />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Router>
      </Suspense>
    </div>
  );
};
export default App;
export const getCountryList = () => {
  return fetch(
    "https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/Geoenrichment/countries?f=pjson"
  ).then((data) => data.json());
};