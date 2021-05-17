import React, { Component } from 'react'
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const AntTabs = withStyles({
  root: {
    width: '90%',
    borderBottom: '1px solid #e8e8e8',
  },
  indicator: {
    backgroundColor: '#1890ff',
  },
})(Tabs);

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

const Wrap = styled.div`
  display: flex;
  justify-content: center;
`;

export default class Lk_Common extends Component {
  state = {
    currentTab: 0,
  }

  render() {
    return (
      <Wrap>
        <AntTabs value={this.state.currentTab} onChange={(event, newValue) => this.setState({currentTab: newValue})} >
          <AntTab label="Заявки на сертификат" />
          <AntTab label="Redeem" />
          <AntTab label="Buy" />
          <AntTab label="Продать" />
          <AntTab label="Статистика" />
        </AntTabs>
      </Wrap>
    )
  }
}
