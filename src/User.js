import React, { Component } from "react";
import "./App.css";

class User extends Component {
  render() {
    return <h1>Hello: {this.props.username}</h1>;
  }
}

export default User;
