import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Header from '../../common/components/header/container';
import LkCommon  from './lk_common';
import LkIssuer  from './lk_issuer';
import LkProvider  from './lk_provider';
import LkVerificator  from './lk_verificator';
import { query } from '../api/query';
import { create } from '../api/create';
import ACTIONS from './store/actions';
import { trading } from '../api/trading';
import CircularProgress from '@material-ui/core/CircularProgress';

const Wrap = styled.div`
`;

const Body = styled.div`
`;

export class Lk extends Component {
  state = {
    isLoading: true,
  }

  async componentDidMount() {
    if (this.props.login) {
      this.setState({isLoading: true});

      await query(`code=WalletSM&context=owner_user,${this.props.login}`, this.props.token).then(data => {
        return data.json();
      }).then(data => {
        if (data.data[0]) {
          this.props.setWallet(data.data);
          return Promise.reject();
        }
        else return create(this.props.token, { code: 'WalletSM' })
      }).then(data => {
        return data.json();
      }).then(data => {
        this.props.setWallet([data.data]);
      }).catch(() => {})


      await query(`code=ClaimSM${this.props.login.startsWith('ca') ? '' : this.props.login.startsWith('ver') ? '&status=ToVerification': `&context=idWallet,${this.props.state.lk.wallet[0].pid}`}`, this.props.token).then(data => {
        return data.json();
      }).then(data => {
        if (data.data[0]) {
          this.props.setClaim(data.data);
          return Promise.reject();
        }
      }).catch(() => {});


      await query(`code=CertSM&context=idWallet,${this.props.state.lk.wallet[0].pid}`, this.props.token).then(data => {
        return data.json();
      }).then(data => {
        if (data.data[0]) {
          this.props.setCert(data.data);
          return Promise.reject();
        }
      }).then(data => {
        return data.json();
      }).then(data => {
        this.props.setCert([data.data]);
      }).catch(() => {})


      await trading(this.props.token).then(data => {
        return data.json();
      }).then(data => {
        if (data.data[0]) {
          this.props.setTrading(data.data);
          return Promise.reject();
        }
      }).catch(() => {})

      this.setState({isLoading: false});
    }
  }
  
  render() {
    console.log('state ', this.props.state);
    return (
      <Wrap>
        <Header />
        <Body>
          {this.state.isLoading ? 
          <CircularProgress />
          :
          <LkProvider {...this.props}/>
          }
        </Body>
      </Wrap>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  login: state.auth.login || '',
  state: state
});

const mapDispatchToProps = dispatch => ({
  setClaim: item => dispatch(ACTIONS.setClaim(item)),
  setCert: item => dispatch(ACTIONS.setCert(item)),
  setWallet: item => dispatch(ACTIONS.setWallet(item)),
  setTrading: item => dispatch(ACTIONS.setTrading(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lk);