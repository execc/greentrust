const types = {
  set_token: "set_token",
  set_login: "set_login",
};

const setToken = token => ({
  type: types.set_token,
  payload: token
});

const setLogin = login => ({
  type: types.set_login,
  payload: login
});

export default {
  setToken,
  setLogin,
  types
};