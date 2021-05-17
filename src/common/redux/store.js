import { createStore } from "redux";

import reducer from "./reducer";

const initialState = {
  token: '',
  login: '',
};

export default function configureStore() {
  const store = createStore(reducer, initialState);
  return store;
}