import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Header from '../../common/components/header/container';
import Input from '@material-ui/core/Input';

const Wrap = styled.div`
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  align-items: center;
  margin: 0 auto;
`;

const Title = styled.div`
  margin-top: 20px;
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const Data = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;

`;

const RightSide = styled.div`
`;

const Photo = styled.div`
  width: 300px;
  height: 400px;
  background-color: green;
`;

export class Profile extends Component {
  render() {
    return (
      <Wrap>
        <Header />
        <Body>
          <Title>
            Profile
          </Title>
          <Data>
            <LeftSide>
              <Input
              >
              </Input>
              <Input>
              </Input>
              <Input>
              </Input>

              <Input>
              </Input>
              <div>
                Device data
                </div>
            </LeftSide>
            <RightSide>
              <Photo />
            </RightSide>
          </Data>
        </Body>
      </Wrap>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
  state: state,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);