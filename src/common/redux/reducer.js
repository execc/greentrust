import { combineReducers } from 'redux';
import auth from '../../pages/auth/store/reducers';
import lk from '../../pages/lk/store/reducers';

export default combineReducers({
  auth,
  lk,
})