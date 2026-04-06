// class component
// function component

import React from "react";

class Mycomponent extends React.Component {
  state = {
    name: "Thịnh",
    address: "511/20 Thống Nhất",
    age: 25,
  };

  handleClick = (event) => {
    this.setState({
      name: "Sdadas",
    });
    console.log("Đã click thành công", this.state.name);
  };

  handleHover(event) {
    console.log("Đã hover thành công");
  }

  //JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and i'm from {this.state.address}
        <button onClick={this.handleClick}>Click</button>
        <button onMouseOver={this.handleHover}>Hover</button>
      </div>
    );
  }
}

export default Mycomponent;
