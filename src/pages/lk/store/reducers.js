export default function lk(state = [], action) {
  switch (action.type) {
    case 'set_claim':
      return {
        ...state,
        claim: action.payload,
      }

    case 'set_cert':
      return {
        ...state,
        cert: action.payload,
      }

    case 'set_wallet':
      return {
        ...state,
        wallet: action.payload,
      }

    case 'set_trading':
      return {
        ...state,
        trading: action.payload,
      }

    default:
      return state
  }
}