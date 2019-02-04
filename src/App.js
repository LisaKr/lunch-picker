import React, { Component } from 'react';
import styled from 'styled-components';

import Setup from "./setup.js";
import img from './back2.jpeg';

import './App.css';

const Wrapper = styled.div`
    background: url(${img});
    height: 100%;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <Setup/>
      </Wrapper>
    );
  }
}

export default App;
