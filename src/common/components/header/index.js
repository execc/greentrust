import React, { Component } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import NotificationIcon from '@material-ui/icons/NotificationImportant';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import AccountBalance from '@material-ui/icons/AccountBalance';
import ProfileIcon from '@material-ui/icons/AccountCircle';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile';
import MyLogo from './assets/logo.svg';

const Wrap = styled.div`
  height: 30px;
  margin-bottom: 20px;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px -10px 20px 0;
`;

const RightSide = styled.div`
  display: flex;
`;

const Wallet = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

const Basket = styled.div`
  margin-right: 20px;
`;

const Notification = styled.div`
`;

const Sertificates = styled.div`
  margin-right: 20px;
`;

const Logo = styled.div`
  width: 200px;
  height: 36px;
  background: url(${MyLogo}) 50% / contain no-repeat;
`;

const Text = styled.div`
  margin-top: 5px;
  margin-right: 15px;
`;

export default class Header extends Component {
  render() {
    console.log(this.props);
    return (
      <Wrap>
        <Link to='/'>
          <Logo />
        </Link>
        <RightSide>
          <Wallet>
            <Text>{(this.props.lk.wallet && this.props.lk.wallet[0].context.balance / 100) || 0} GRT</Text>
            <AccountBalance style={{ fontSize: 25 }}/>
          </Wallet>
          <Notification>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationIcon />
              </Badge>
            </IconButton>
          </Notification>
          <Sertificates>
            <IconButton color="inherit">
              <Badge badgeContent={this.props.lk.cert && this.props.lk.cert.filter(item => item.currentState === 'Active').length || 0} color="secondary">
                <InsertDriveFile/>
              </Badge>
            </IconButton>
          </Sertificates>
          <Link to='/profile'>
            <ProfileIcon style={{ fontSize: 45 }}/>
          </Link>
        </RightSide>
      </Wrap>
    )
  }
}
