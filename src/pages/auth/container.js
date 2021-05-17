import { connect } from "react-redux";
import ACTIONS from './store/actions';
import Auth from './';

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  setUserToken: item => dispatch(ACTIONS.setToken(item)),
  setUserLogin: item => dispatch(ACTIONS.setLogin(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);