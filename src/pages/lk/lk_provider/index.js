import React, { Component } from 'react'
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AButton from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import { event } from '../../api/event';
import { query } from '../../api/query';
import { create } from '../../api/create';
import { trading as tradingFetch } from '../../api/trading';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Input from '@material-ui/core/Input';
import CircularProgress from '@material-ui/core/CircularProgress';

const Button = withStyles({
  root: {
    textTransform: 'none',
  },
})(AButton);

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
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const ButtonWrap = styled.div`
  display: flex;
  width: 600px;
  margin-top: 30px;
`;

const ModalWrap = styled.div`
  position: absolute;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 540px;
  height: 240px;
  border-radius: 15px;
  left: calc(50% - 250px);
  top: calc(50% - 250px);
  padding: 30px;
  outline: none;
`;

const ModalHeader = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ModalBody = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;

const ModalData = styled.div`
  margin-bottom: 30px;
`;

const ModalRow = styled.div`
  display: flex;
  text-align: center;
`;

const ModalColumn = styled.div`
  margin: 0 20px;
`;

const ModalLabel = styled.div`
  margin-bottom: 15px;
`;

const ModalValue = styled.div`
  font-size: 20px;
  display: flex;
  align-items: center;
`;

const EmptyList = styled.div`
  margin-top: 30px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;

const ModalValueLabel = styled.div`
  margin-left: 10px;
`;

const headRowsFirst = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Request date' },
  { id: 'id', numeric: true, disablePadding: false, label: 'Request ID' },
  { id: 'mgvt', numeric: true, disablePadding: false, label: 'Amount of power' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
];

const headRowsSecond = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Request date' },
  { id: 'id', numeric: true, disablePadding: false, label: 'Request ID' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'org', numeric: true, disablePadding: false, label: 'Organization name' },
];

const headRowsThird = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Request date' },
  { id: 'id', numeric: true, disablePadding: false, label: 'Request ID' },
  { id: 'status', numeric: true, disablePadding: false, label: 'Status' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Cost' },
  { id: 'org', numeric: true, disablePadding: false, label: 'Organization name' },
];

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  console.log('SORT ', array);
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const Advice = styled.div`
  margin: 12px 20px;
  opacity: 0.6;
  font-size: 16px;
`;

const StatusMap = {
  ToCenter: 'Sent to Regulator',
  ToVerification: 'On Verification',
  CreateClaim: 'Create Request',
  Trading: 'Trading',
  Active: 'Active',
}
function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}
export default class Lk_Common extends Component {
  state = {
    currentTab: 0,
    certModaVisible: false,
    verModalVisible: false,
    sellModalVisible: false,
    order: 'asc',
    orderBy: 'startDate',
    produced: '',
    maxCountEnergy: '',
    currentPid: '',
    price: 1,
  }

  handleRequestSort(event, property) {
    const isDesc = this.state.orderBy === property && this.state.order === 'desc';
    this.setState({order: isDesc ? 'asc' : 'desc', orderBy: property});
  }

  createSortHandler = property => event => {
    this.handleRequestSort(event, property);
  };

  componentWillMount() {
    const {login} = this.props;
    if (!login.startsWith('ca') && !login.startsWith('ver') && !login.startsWith('pro')) 
      this.setState({currentTab: 1 });
  }

  render() {
    const { login } = this.props;
    const { claim, cert, wallet, trading } = this.props.state.lk;
    const { order, orderBy } = this.state;

    const hasRole = login.startsWith('ca') || login.startsWith('ver') || login.startsWith('pro');

    return (
      <Wrap>

{/** ****************************************************** */}

        <AntTabs value={hasRole ? this.state.currentTab : this.state.currentTab - 1} onChange={(event, newValue) => this.setState({currentTab: hasRole ? newValue : (newValue + 1)})} >
          {hasRole && <AntTab label="Create issue Certificate request" />}
          <AntTab label="Redeem" />
          <AntTab label="Buy" />
          <AntTab label="Sell" />
          <AntTab label="Stats" />
        </AntTabs>

{/** ****************************************************** */}

        {this.state.currentTab === 0 &&
          <Content>
            {this.props.login.startsWith('pro') && 
              <ButtonWrap>
                <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  aria-label="Add"
                  onClick={() => {
                    this.setState(this.setState({certModaVisible: true}))
                  }}
                >
                  Request Certificate
                </Fab>
                <Advice>Avialible 143 MW·h</Advice>
              </ButtonWrap>
            }
            
            {claim && claim.length ?
              <Table>
                <TableHead>
                  <TableRow>
                    {headRowsFirst.map((row, index) => (
                      <TableCell
                        key={`${row.pid}${index}`}
                        align='left'
                        sortDirection={orderBy === row.id ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === row.id}
                          direction={order}
                          onClick={this.createSortHandler(row.id)}
                        >
                          {row.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                    {(this.props.login.startsWith('ca') || this.props.login.startsWith('ver')) && <TableCell />}
                  </TableRow>
                </TableHead>
                  <TableBody>
                  {stableSort(claim.filter(item => item.currentState && !item.currentState.startsWith('Final')), getSorting(order, orderBy))
                    .map(row => {
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.pid}
                        >
                          <TableCell component="th" scope="row" align="left">
                            {row.startTime.slice(0, 10)}
                          </TableCell>
                          <TableCell align="left">{row.pid}</TableCell>
                          <TableCell align="left">{row.context.countEnergy === 0 ? randomInteger(2, 149): row.context.countEnergy} MW/h</TableCell>
                          <TableCell align="left">{StatusMap[row.currentState]}</TableCell>
                          {this.props.login.startsWith('ca') && 
                            <TableCell align="left">
                              {row.currentState === 'ToCenter' && 
                                <Button 
                                  disableRipple
                                  onClick={() => {
                                    event(this.props.token, { code: 'ClaimSM', pid: row.pid, event: 'SignalOnVerification' }).then(data => {
                                      return data.json();
                                    }).then(() => {
                                      return query(`code=ClaimSM`, this.props.token);
                                    }).then(data => {
                                        return data.json();
                                      }).then(data => {
                                        this.props.setClaim(data.data);
                                      });
                                    }
                                  }
                                >
                                  Send to Verification
                                </Button>
                              }
                            </TableCell>
                          }
                          {this.props.login.startsWith('ver') && 
                            <TableCell align="left">
                              {row.currentState === 'ToVerification' && 
                                <Button 
                                  disableRipple
                                  onClick={() => {
                                    this.setState({verModalVisible: true, currentPid: row.pid})
                                  }}
                                >
                                  Report
                                </Button>
                              }
                            </TableCell>
                          }
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
              :
              <EmptyList>No requests</EmptyList>
            }
          </Content>
        }

{/** ****************************************************** */}

        <Modal
          open={this.state.verModalVisible}
          onClose={() => this.setState({verModalVisible: false})}
        >
          <ModalWrap>
            {this.state.loading ? 
            <CircularProgress />
            :
            <div>
            <ModalHeader>
              Report Data
            </ModalHeader>
            <ModalBody>
              <ModalData>
                <ModalRow>
                  <ModalColumn>
                    <ModalLabel>
                      Maximum amount of Power produced since 2021-05-05 to 2021-05-06
                    </ModalLabel>
                    <ModalValue>
                      <Input
                        value={this.state.maxCountEnergy}
                        onChange={e => this.setState({maxCountEnergy: e.target.value})}
                      />
                      <ModalValueLabel>MW·h</ModalValueLabel>
                    </ModalValue>
                  </ModalColumn>
                </ModalRow>
              </ModalData>
              <ModalLabel>
                <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  aria-label="Add"
                  onClick={() => {
                    this.setState({loading: true});

                    event(this.props.token, { 
                      code: 'ClaimSM', pid: this.state.currentPid, event: 'SignalMaxCountEnergy', 
                      parameters: {
                        maxCountEnergy: this.state.maxCountEnergy
                      }
                    }).then(data => {
                      return data.json();
                    }).then(data => {
                      return query(`code=ClaimSM&status=ToVerification`, this.props.token);
                    }).then(data => {
                      return data.json();
                    }).then(data => {
                      this.props.setClaim(data.data);
                      this.setState({verModalVisible: false});
                      this.setState({loading: false});
                    })
                  }}
                >
                  Send report
                </Fab>
              </ModalLabel>
              <Button
                onClick={() => this.setState({verModaVisible: false})}
              >
                Cancel
              </Button>
            </ModalBody>
            </div>}
          </ModalWrap>
        </Modal>

{/** ****************************************************** */}

        <Modal
          open={this.state.certModaVisible}
          onClose={() => this.setState({certModaVisible: false})}
        >
          <ModalWrap>
            {this.state.loading ? 
            <CircularProgress />
            :
            <div>
            <ModalHeader>
              Certificate issue request
            </ModalHeader>
            <ModalBody>
              <ModalData>
                <ModalRow>
                  <ModalColumn>
                    <ModalLabel>
                      Device ID
                    </ModalLabel>
                    <ModalValue>
                      {claim && claim[0] && claim[0].context.idMeter || '01'}
                    </ModalValue>
                  </ModalColumn>
                  <ModalColumn>
                    <ModalLabel>
                      Amount of power produced
                    </ModalLabel>
                    <ModalValue>
                      <Input
                        value={this.state.produced}
                        onChange={e => this.setState({produced: e.target.value})}
                      />
                      <ModalValueLabel>MW·h</ModalValueLabel>
                    </ModalValue>
                  </ModalColumn>
                </ModalRow>
              </ModalData>
              <ModalLabel>
                <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  aria-label="Add"
                  onClick={() => {
                    this.setState({loading: true});

                    create(this.props.token, { code: 'ClaimSM' }).then(data => {
                      return data.json();
                    }).then(data => {
                      return event(this.props.token, { 
                        code: 'ClaimSM', pid: data.data.pid || null, event: 'SignalDeposit', 
                        parameters: {
                          inTotalProduced: 150
                        }
                      })
                    }).then(data => {
                      return data.json();
                    }).then(data => {
                      return event(this.props.token, { 
                        code: 'ClaimSM', pid: data.data.pid || null, event: 'SignalSendToMC', 
                        parameters: {
                          inCountEnergy: this.state.produced,
                          inIdWallet: wallet && wallet[0].pid,
                          dateStart: new Date().getTime(),
                          dateEnd: new Date().getTime(),
                        }})
                    }).then(data => {
                      return data.json();
                    }).then(data => {
                      this.props.setClaim([...claim || [], data.data]);
                      this.setState({certModaVisible: false});
                      this.setState({loading: false});
                    })
                  }}
                >
                  Create request
                </Fab>
              </ModalLabel>
              <Button
                onClick={() => this.setState({certModaVisible: false})}
              >
                Cancel
              </Button>
            </ModalBody>
            </div>}
          </ModalWrap>
        </Modal>

{/** ****************************************************** */}

        {this.state.currentTab === 1 && 
          <Content>
            {cert && cert.length &&
              <Table>
                <TableHead>
                  <TableRow>
                    {headRowsSecond.map((row, index) => (
                      <TableCell
                        key={`${row.pid}${index}`}
                        align='left'
                        sortDirection={orderBy === row.id ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === row.id}
                          direction={order}
                          onClick={this.createSortHandler(row.id)}
                        >
                          {row.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                    <TableCell />
                  </TableRow>
                </TableHead>
                  <TableBody>
                  {stableSort(cert.filter(item => !item.currentState.startsWith('Final')), getSorting(order, orderBy))
                    .map(row => {
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.pid}
                        >
                          <TableCell component="th" scope="row" align="left">
                            {row.startTime.slice(0, 10)}
                          </TableCell>
                          <TableCell align="left">{row.pid}</TableCell>
                          <TableCell align="left">{StatusMap[row.currentState]}</TableCell>
                          <TableCell align="left">{row.context.owner_org}</TableCell>
                          <TableCell align="left">
                            {row.currentState === 'Active' &&
                              <Button 
                                disableRipple
                                onClick={() => {
                                  event(this.props.token, { code: 'CertSM', pid: row.pid, event: 'SignalToRedeemed' }).then(data => {
                                    return data.json();
                                  }).then(data => {
                                    return query(`code=CertSM&context=idWallet,${this.props.state.lk.wallet[0].pid}`, this.props.token);
                                  }).then(data => {
                                      return data.json();
                                  }).then(data => {
                                    this.props.setCert(data.data);
                                  });
                                }}
                              >
                                Redeem
                              </Button>
                            }
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            }
          </Content>
        }

{/** ****************************************************** */}

        {this.state.currentTab === 2 && 
          <Content>
            {trading &&
              <Table>
                <TableHead>
                  <TableRow>
                    {headRowsThird.map(row => (
                      <TableCell
                        key={row.pid}
                        align='left'
                        sortDirection={orderBy === row.id ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === row.id}
                          direction={order}
                          onClick={this.createSortHandler(row.id)}
                        >
                          {row.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                    <TableCell />
                  </TableRow>
                </TableHead>
                  <TableBody>
                  {trading.filter(item => item.currentState && !item.currentState.startsWith('Final'))
                    .map(row => {
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.pid}
                        >
                          <TableCell component="th" scope="row" align="left">
                            {row.startTime.slice(0, 10)}
                          </TableCell>
                          <TableCell align="left">{row.pid}</TableCell>
                          <TableCell align="left">{StatusMap[row.currentState]}</TableCell>
                          <TableCell align="left">{row.context.price/100}</TableCell>
                          <TableCell align="left">{row.context.owner_org}</TableCell>
                          <TableCell align="left"><Button onClick={() => {
                            event(this.props.token, { 
                              code: 'CertSM', pid: row.pid, event: 'SignalBuy',
                              parameters: {
                                receiver: this.props.state.lk.wallet[0].pid,
                              }
                            }).then(data => {
                              return data.json();
                            }).then(() => {
                              return query(`code=WalletSM&context=owner_user,${this.props.login}`, this.props.token);
                            }).then(data => {
                              return data.json();
                            }).then(data => {
                              this.props.setWallet(data.data);
                              return tradingFetch(this.props.token);
                            }).then(data => {
                              return data.json();
                            }).then(data => {
                              this.props.setTrading(data.data);
                              return query(`code=CertSM&context=idWallet,${this.props.state.lk.wallet[0].pid}`, this.props.token);
                            }).then(data => {
                              return data.json();
                            }).then(data => {
                              this.props.setCert(data.data);
                            })
                          }}>Buy</Button></TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            }
          </Content>
        }

{/** ****************************************************** */}

        {this.state.currentTab === 3 && 
          <Content>
            {cert &&
              <Table>
                <TableHead>
                  <TableRow>
                    {headRowsSecond.map(row => (
                      <TableCell
                        key={row.pid}
                        align='left'
                        sortDirection={orderBy === row.id ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === row.id}
                          direction={order}
                          onClick={this.createSortHandler(row.id)}
                        >
                          {row.label}
                        </TableSortLabel>
                      </TableCell>
                    ))}
                    <TableCell />
                  </TableRow>
                </TableHead>
                  <TableBody>
                  {stableSort(cert.filter(item => item.currentState && !item.currentState.startsWith('Final')), getSorting(order, orderBy))
                    .map(row => {
                      return (
                        <TableRow
                          hover
                          tabIndex={-1}
                          key={row.pid}
                        >
                          <TableCell component="th" scope="row" align="left">
                            {row.startTime.slice(0, 10)}
                          </TableCell>
                          <TableCell align="left">{row.pid}</TableCell>
                          <TableCell align="left">{StatusMap[row.currentState]}</TableCell>
                          <TableCell align="left">{row.context.owner_org}</TableCell>
                          {row.currentState === 'Active' ? 
                            <TableCell align="left"><Button 
                              onClick={() => {
                                this.setState({sellModalVisible: true, currentPid: row.pid})
                              }}>Trade</Button>
                            </TableCell> :
                            <TableCell align="left"><Button 
                              onClick={() => {
                                event(this.props.token, { 
                                  code: 'CertSM', pid: row.pid, event: 'SignalAborting',
                                }).then(data => {
                                  return data.json();
                                }).then(() => {
                                  return query(`code=CertSM&context=idWallet,${this.props.state.lk.wallet[0].pid}`, this.props.token);
                                }).then(data => {
                                  return data.json();
                                }).then(data => {
                                  this.props.setCert(data.data);
                                  this.setState({sellModalVisible: false});
                                  this.setState({loading: false});
                                })
                              }}>Cancel Trade</Button>
                            </TableCell>
                          }
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            }
          </Content>
        }

{/** ****************************************************** */}

        <Modal
          open={this.state.sellModalVisible}
          onClose={() => this.setState({sellModalVisible: false})}
        >
          <ModalWrap>
            {this.state.loading ? 
            <CircularProgress />
            :
            <div>
            <ModalHeader>
              Trade conditions
            </ModalHeader>
            <ModalBody>
              <ModalData>
                <ModalRow>
                  <ModalColumn>
                    <ModalLabel>
                      Price per 1 certificate (GRT)
                    </ModalLabel>
                    <ModalValue>
                      <Input
                        value={this.state.price}
                        onChange={e => this.setState({price: e.target.value})}
                      />
                    </ModalValue>
                  </ModalColumn>
                </ModalRow>
              </ModalData>
              <ModalLabel>
                <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  aria-label="Add"
                  onClick={() => {
                    this.setState({loading: true});

                    event(this.props.token, { 
                      code: 'CertSM', pid: this.state.currentPid, event: 'SignalOffer', 
                      parameters: {
                        price: this.state.price * 100
                      }
                    }).then(data => {
                      return data.json();
                    }).then(() => {
                      return query(`code=CertSM&context=idWallet,${this.props.state.lk.wallet[0].pid}`, this.props.token);
                    }).then(data => {
                      return data.json();
                    }).then(data => {
                      this.props.setCert(data.data);
                      this.setState({sellModalVisible: false});
                      this.setState({loading: false});
                    })
                  }}
                >
                  Trade
                </Fab>
              </ModalLabel>
              <Button
                onClick={() => this.setState({sellModaVisible: false})}
              >
                Cancel
              </Button>
            </ModalBody>
            </div>}
          </ModalWrap>
        </Modal>


{/** ****************************************************** */}
      </Wrap>
    )
  }
}
