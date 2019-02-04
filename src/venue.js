import React, { Component } from "react";
import styled from "styled-components";

const VenueContainer = styled.div`
  width: 33.3%;
  border: 1px solid black;
  padding: 0.5em;
  font-size: 1.17em;
  font-weight: bold;
`;

class Venue extends Component {
  constructor() {
    super();

    this.vote = this.vote.bind(this);
  }

  vote(e) {
    console.log("on vote in grandchild", e.target);
    this.props.onVote(this.props.name);
  }

  render() {
    return (
      <VenueContainer onClick={this.vote}>
        {this.props.name} <br />
        <br />
        {this.props.address}
        <br />
        <br />
        {this.props.category}
        <br />
        <br />
      </VenueContainer>
    );
  }
}

export default Venue;
