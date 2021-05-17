import { connect } from "react-redux";
import Header from './';

const mapStateToProps = state => ({
  token: state.auth.token,
  login: state.auth.login,
  lk: state.lk
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);