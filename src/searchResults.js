import React, { Component } from "react";
import styled from "styled-components";

import Venue from "./venue.js";

const SearchResultsContainer = styled.div`
  display: flex;
  width: 45%;
  text-align: center;
  background-color: #ac9b82;
  padding: 0.5em;
`;

class SearchResults extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <SearchResultsContainer>
        {this.props.lunch.map(venue => {
          return (
            <Venue
              key={venue.venue.id}
              name={venue.venue.name}
              address={venue.venue.location.address}
              category={venue.venue.categories[0].name}
              onVote={this.props.onVote}
            />
          );
        })}
      </SearchResultsContainer>
    );
  }
}

export default SearchResults;
