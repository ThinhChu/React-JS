import React from "react";

class UseInfo extends React.Component {
  state = {
    name: "Thịnh",
    address: "511/20 Thống Nhất",
    age: 25,
  };

  handleChangeName = (event) => {
    // console.log(event.target.value);
    this.setState({
      name: event.target.value,
    });
  };

  handleChangeAge = (event) => {
    // console.log(event.target.value);
    this.setState({
      age: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <div>
        My name is {this.state.name} and i'm from {this.state.address}, i'm{" "}
        {this.state.age}
        <form onSubmit={this.handleSubmit}>
          <label>Tên:</label>
          <input type="text" onChange={this.handleChangeName} />
          <label>Tuổi</label>
          <input type="text" onChange={this.handleChangeAge} />
          <button type="submit">Gửi</button>
        </form>
      </div>
    );
  }
}

export default UseInfo;
