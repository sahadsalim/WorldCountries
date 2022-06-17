import {  useSelector } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import List from "../LIst/List";
import ContinentList from "../LIst/ContinentList";
import Header from "./Header";

const Home = (props) => {
  const auth = useSelector((state) => state.auth);
  let isOpen = true;
  let [continent, setContinent] = useState([]);
  let [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    if (props.countries.length>0) {
      setFilteredList(props.countries);
      const continents = props.countries.map((m) => {
        return m.continent;
      });
      const uniqContinents = new Set(continents);
      setTimeout(() => {
        setContinent([...uniqContinents]);
      }, 0);      
    }
 }
  , [props.countries]);
  const onContinentSelect = (evt) => {
    let filteredList1 = props.countries.filter((m) => m.continent === evt);
    setFilteredList(filteredList1);
  };

  return (
    <Fragment>
      {/* <Link  to="/fav"> Fav</Link> */}
      <Header />
      {auth.isLogged ? (
        <div className="flex">
          <div className=" w-64">
            <nav
              className={
                "md:block px-4 pb-4 md:pb-0 md:overflow-y-auto" +
                (isOpen ? "block" : "hidden")
              }
            >
              {continent.length > 0 ? (
                <ContinentList
                  onContinentSelect={onContinentSelect}
                  continent={continent}
                />
              ) : null}
            </nav>
          </div>
          <div className="flex-1">
            {filteredList.length > 0 ? <List title="Country" countries={filteredList} /> : null}
          </div>
        </div>
      ) : (
        <h4 className="text-center">
          Please login see data.{" "}
          <a className="text-blue-500" href="/login">
            Click here to Login
          </a>
        </h4>
      )}
    </Fragment>
  );
};
export default Home;
