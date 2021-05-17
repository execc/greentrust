const types = {
  set_claim: "set_claim",
  set_cert: "set_cert",
  set_wallet: "set_wallet",
  set_trading: "set_trading",
};

const setClaim = claim => ({
  type: types.set_claim,
  payload: claim
});

const setCert = cert => ({
  type: types.set_cert,
  payload: cert
});

const setWallet = cert => ({
  type: types.set_wallet,
  payload: cert
});

const setTrading = q => ({
  type: types.set_trading,
  payload: q
});

export default {
  setClaim,
  setCert,
  setWallet,
  setTrading,
  types
};