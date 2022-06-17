import { combineReducers } from "redux";
const authReducer = (state = { isLogged: false }, action) => {
  if (action.payload) {
    let user = localStorage.getItem("users");
    const userList = JSON.parse(user) || [];
    const validUser = userList?.find(
      (m) =>
        m.email === action.payload.userName &&
        m.password === action.payload.password
    );
    const existingUser = userList?.find(
      (m) => m.email === action.payload.email
    );
    switch (action.type) {
      case "LOGIN":
        if (validUser) {
          state = { ...state, isLogged: true,...validUser };
        }
        break;
      case "SIGN_OUT":
        state={isLogged:false};
        localStorage.setItem('logged',false);
        break;
      case "SIGN_UP":
        let list =[];
        if (!existingUser) {
          list =[action.payload];
        }else{
          list=userList.push(action.payload);
        }
        let userData = JSON.stringify(list);
        localStorage.setItem("users", userData);
        break;
      case "UPDATE_DATA":
        if (existingUser) {
          let otherUsersList=userList.filter((m)=>m.email!==action.payload.email);
          otherUsersList.push(action.payload);
          let userData = JSON.stringify(otherUsersList);
          localStorage.setItem("users", userData);
        }
        break;
      case "DELETE_USER":
        if (existingUser) {
          let otherUsersList=userList.filter((m)=>m.email!==action.payload.email);
          let userData = JSON.stringify(otherUsersList);
          localStorage.setItem("users", userData);
        }
        state={isLogged:false};
        localStorage.setItem('logged',false);
        break;
      default:
        break;
    }
  }

  return state;
};
const countryReducer = (state = [], action) => {
  if (action.type === "SET_COUNTRY") {
    let stateList = [...state, ...action.payload];
    stateList = stateList.reduce((accumulator, currentValue) => {
      currentValue["isFavorite"] = false;
      accumulator.push(currentValue);
      return accumulator;
    }, []);
    return [...stateList];
  } else if (action.type === "GET_COUNTRY_LIST") {
    return state;
  } else if (action.type === "SET_FAVORITE") {
    state = state.reduce((accumulator, currentValue) => {
      if (currentValue.name === action.payload) {
        currentValue.isFavorite = !currentValue.isFavorite;
      }
      accumulator.push(currentValue);
      return accumulator;
    }, []);
    return state;
  }
  return state;
};
const rootReducer = combineReducers({
  auth: authReducer,
  country: countryReducer,
});
export default rootReducer;
