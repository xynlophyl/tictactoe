import React, { Component } from "react";
const game = require('./GameLogic')


class AI extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      grid_vals: ["","","","","","","","",""],
    }
  }

  winCheck = () => {
    let grid = this.state.grid_vals
  }
}

export default AI;