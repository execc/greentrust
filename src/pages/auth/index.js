import React, { Component } from 'react'
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as authApi from './api';

const backgroundImg = require('./assets/background.jpg');

const Background = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
  background: url(${backgroundImg}) 100% / cover no-repeat;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  background-color: #fff;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25);
  border-radius: 15px;
`;

const Header = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  border-bottom: 1px solid grey;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 20px 40px;
`;

const Wrapper = styled.div`
  margin-bottom: 15px;
`;

const Notify = styled.div`
  text-align: center;
`;

export default class Auth extends Component {
  state = {
    login: 'test',
    password: 'test',
    isLoading: false,
  }

  render() {
    return (
      <Background>
        <Grid>
          <Header>
            Welcome back!
          </Header>
          <Body>
            <Wrapper>
              <TextField 
                label='Login'
                placeholder='Username'
                value={this.state.login}
                onChange={(e) => this.setState({login: e.target.value})}
              />
            </Wrapper>
            <Wrapper>
              <TextField
                label='Password'
                type='password'
                value={this.state.password}
                onChange={(e) => this.setState({password: e.target.value})}
              />
            </Wrapper>
            <Notify>
              {this.state.isLoading ?
              <CircularProgress />
              :
              <Wrapper>
                <Link href='/register'>Forgot password?</Link>
              </Wrapper>
              }
              <Wrapper>
                <Button onClick={() => {
                  this.setState({isLoading: true});
                  const userData = { login: this.state.login, password: this.state.password };
                  authApi.enrollAdmin().then(data => {
                    return data;
                  }).then(() => {
                    return authApi.adminLogin();
                  }).then(data => {
                    return data.json();
                  }).then(data => {
                    return authApi.adminUser(userData, data.data.token)
                  }).then(data => {
                    return data.json();
                  }).then(() => {
                    return authApi.publicAuth(userData)
                  }).then(data => {
                    return data.json();
                  }).then(data => {
                    this.setState({isLoading: false});
                    if (data.success) {
                      this.props.setUserToken(data.data.token);
                      this.props.setUserLogin(data.data.login);
                      this.props.history.push('/');
                    }
                  })
                }}>Sign Up</Button>
              </Wrapper>
            </Notify>
            <Fab
              variant="extended"
              size="medium"
              color="primary"
              aria-label="Add"
              onClick={() => {
                this.setState({isLoading: true});
                authApi.publicAuth({ login: this.state.login, password: this.state.password }).then(data => {
                  return data.json();
                }).then(data => {
                  this.setState({isLoading: false});
                  if (data.success) {
                    this.props.setUserToken(data.data.token);
                    this.props.setUserLogin(data.data.login);
                    this.props.history.push('/');
                  }
                })
              }}
            >
              Continue
            </Fab>
          </Body>
        </Grid>
      </Background>
    )
  }
}