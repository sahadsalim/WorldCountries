import rootReducer from "./reducer";

const { createStore } = require("redux");
const store = createStore(rootReducer);
export default store;
