import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Profile from './profile';
import Auth from './auth/container';
import Marketplace from './marketplace';
import Lk from './lk';
import { userData } from './api/userData';

export class MainRouter extends Component {
  componentDidMount() {
    if (!this.props.token) {
      this.props.history.push('/login');
    }
    else {
      userData();
    }
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Lk}/>
          <Route path='/login' component={Auth}/>
          <Route path='/marketplace' component={Marketplace}/>
          <Route path='/profile' component={Profile}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainRouter));