import React from "react";

class AddUseInfor extends React.Component {
  state = {
    name: "Thịnh",
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
    const userNew = {
      id: Math.random(1, 100),
      name: this.state.name,
      age: this.state.age,
    };
    // console.log(this.state);
    this.props.handleAddNewUser(userNew);
  };
  render() {
    return (
      <div>
        My name is {this.state.name} and i'm {this.state.age}
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

export default AddUseInfor;
