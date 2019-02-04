import React, { Component } from "react";
import styled from "styled-components";
import axios from "./axios.js";

import SearchResults from "./searchResults.js";

let secrets;
if (process.env.NODE_ENV === "production") {
  secrets = process.env;
} else {
  secrets = require("./secrets.json");
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 2em;
`;

const Title = styled.h1`
  margin: 0;
`;

const Input = styled.input`
  padding: 10px 10px 10px 10px;
  border: none;
  outline: none;
  width: 15%;
  font-size: 14px;
  border: 1px solid black;
`;

const Button = styled.button`
    background-color: #E7717D;
    border: 0;
    padding: 1em;
    font-size: 16px;
    outline: none;
    margin: 1em;
    margin-right: 0;

    :hover {
        background-color: #ca626d;
    }

    :active {
        background-color: #ca626d;
        box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
`;

class Setup extends Component {
  constructor() {
    super();
    this.state = {};

    this.getRandomLunchOptions = this.getRandomLunchOptions.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  async getRandomLunchOptions(address) {
    address = address.replace(/\s/g, "+");
    address = address.replace(/,/g, "%2C");
    address = address.replace(/ä/g, "ae");
    address = address.replace(/ö/g, "oe");
    address = address.replace(/ü/g, "ue");
    address = address.replace(/ß/g, "ss");

    const coordQuery = `https://api.opencagedata.com/geocode/v1/json?q=${address}&key=${
      secrets.geo_key
    }`;

    const coordResp = await axios.get(coordQuery);

    const lat = coordResp.data.results[0].bounds.northeast.lat;
    const lng = coordResp.data.results[0].bounds.northeast.lng;

    const offset = Math.random() * (101 - 0) + 0;

    const foodQuery = `https://api.foursquare.com/v2/venues/explore?client_id=${
      secrets.id
    }&client_secret=${
      secrets.secret
    }&query=lunch&ll=${lat},${lng}&offset=${offset}&v=20170801&limit=3`;

    let foodResp = await axios.get(foodQuery);

    this.setState({
      lunchArray: foodResp.data.response.groups[0].items
    });
  }

  onVote(name) {
    console.log("on vote in app", name);
  }

  render() {
    return (
      <Content>
        <Title>Democratic voting for your lunch</Title>
        <h2> No more agonizing lunch decisions </h2>
        <Input
          placeholder="Enter your address"
          name="address"
          onChange={this.handleInput}
        />
        <Button
          onClick={() => {
            console.log("magic will happen here");
            this.getRandomLunchOptions(this.state.address);
          }}
        >
          Show me some random lunch places
        </Button>

        {this.state.lunchArray && (
          <SearchResults lunch={this.state.lunchArray} onVote={this.onVote} />
        )}
      </Content>
    );
  }
}

export default Setup;
