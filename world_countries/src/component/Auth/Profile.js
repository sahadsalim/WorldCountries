import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, updateData } from "../../redux/actions";
import store from "../../redux/store";

const Profile = () => {
  const [data, setData] = useState({
    displayName: "",
    country: "",
    email: "",
    password: "",
    error: "",
  });
  const pattern = /^[a-zA-Z0-9]{15,}$/;
  let navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setValue(store.getState()?.auth?.email);
  }, [store.getState()?.auth?.email])
  const setValue=(name)=>{
    let user = localStorage.getItem("users");
    const userList = JSON.parse(user) || [];
    const selectedUser = userList.find((user)=>user.email===name);
    setData(selectedUser);
  }
  const displayNameChange = (event) => {
    setData({ ...data, displayName: event.target.value });
  };

  const passwordChange = (event) => {
    setData({ ...data, password: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (pattern.test(data.password)) {
      setData({ ...data, error: "" });
      dispatch(updateData(data));
      navigate("/login");
    } else {
      setData({ ...data, error: "8-20 Letters and digits" });
    }
  };
  const deleteAccount=()=>{
    dispatch(deleteUser(data));
    navigate("/home");
  }
  return (
    <div className="w-full max-w-xs mar">
        <h1 className="text-lg text-white">Profile</h1>
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
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            country
          </label>
          <h4 className="text-blue-800 text-center text-lg">{data.country}</h4>
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
            value={data.email} disabled
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
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          ) : null}
        </div>
        <p>{data.error}</p>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
          <button
            type="button"
            onClick={deleteAccount}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
};
export default Profile;
