import React, { Component } from "react";
import styled from "styled-components";

const VenueContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 33.3%;
  border: 1px solid black;
  padding: 0.5em;
  font-size: 1.17em;
  font-weight: bold;
  text-aling: center;
`;

const VenueDetails = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.5em;
`;

const Button = styled.div`
  background-color: #e7717d;
  border: 0;
  padding: 0.5em;
`;

class Venue extends Component {
  // constructor() {
  //   super();
  // }

  render() {
    return (
      <VenueContainer>
        <VenueDetails>
          {this.props.name} <br />
          <br />
          {this.props.address}
          <br />
          <br />
          {this.props.category}
          <br />
          <br />
          Votes: {this.props.votes} <br />
        </VenueDetails>
        <Button
          onClick={() => {
            this.props.onVote(this.props.name);
          }}
        >
          Vote
        </Button>
      </VenueContainer>
    );
  }
}

export default Venue;
