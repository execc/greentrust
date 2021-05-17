export default function auth(state = [], action) {
  switch (action.type) {
    case 'set_token':
      return {
        ...state,
        token: action.payload,
      }

    case 'set_login':
      return {
        ...state,
        login: action.payload,
      }

    default:
      return state
  }
}