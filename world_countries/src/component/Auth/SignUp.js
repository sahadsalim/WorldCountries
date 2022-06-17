import React, { useEffect, useState } from "react";
import { getCountryList, signup } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import store from "../../redux/store";
const SignUp = () => {
  const dispatch = useDispatch();
  // const country = useSelector((state) => state.country);

  const pattern = /^[a-zA-Z0-9]{15,}$/;
  const pattern1 = /^[a-zA-Z0-9]{1,}$/;

  let navigate = useNavigate();
  let [countries, setCountries] = useState([]);
  let [selectValue,setSelectValue]=useState('');
  useEffect(() => {
    let data = store.getState().country;
    setCountries(data);
    return () => {};
  }, []);

  const [data, setData] = useState({
    displayName: "",
    country: "",
    email: "",
    password: "",
    error: "",
    error1: "",
  });

  const displayNameChange = (event) => {
      setData({ ...data, displayName: event.target.value});
  };

  const countryChange = (event) => {
    setSelectValue(event.target.value);
    setData({ ...data, country: event.target.value });
  };
  const emailChange = (event) => {
    setData({ ...data, email: event.target.value });
  };
  const passwordChange = (event) => {
    setData({ ...data, password: event.target.value });
  };
  const listItems =
    countries &&
    countries?.map((m) => (
      <option value={m.altName} key={m.id}>
        {m.altName}
      </option>
    ));
  const handleSubmit = (event) => {
    event.preventDefault();
    if (pattern.test(data.password) && pattern1.test(data.displayName)) {
      setData({ ...data, error: "",error1:"" });
      dispatch(signup(data));
      navigate("/login");
    } else {
      if(!pattern.test(data.password)) {
      setData({ ...data, error: "15 Letters and digits, no special character" });
      }
      if(!pattern1.test(data.displayName)) {
        setData({ ...data, error1: "no special character allowed" });
      }
    }
  };
  return (
    <div className="w-full max-w-xs mar">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            displayName
          </label>
          <input
            type="text"
            value={data.displayName}
            onChange={displayNameChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            placeholder="Username"
          />
          {data.submitted && data.error1 ? (
            <p className="text-red-500 text-xs italic">
              {data.error1}.
            </p>
          ) : null}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            country
          </label>
          <select
            name="cars"
            id="cars"
            className="bg-blue-500 text-lg w-full"
            value={selectValue} 
            onChange={countryChange.bind(this)}
          >
            <option hidden>
              Select Country
            </option>
            {listItems ? listItems : null}
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="text"
            value={data.email}
            onChange={emailChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            placeholder="email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            value={data.password}
            onChange={passwordChange}
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          {data.submitted && data.error ? (
            <p className="text-red-500 text-xs italic">'password: '{data.error}</p>
          ) : null}
          {data.submitted && data.error ? (
            <p className="text-red-500 text-xs italic">'displayName '{data.error}</p>
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
          <Link
            to="/login"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};
export default SignUp;
