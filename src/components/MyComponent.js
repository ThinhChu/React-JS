// class component
// function component

import React from "react";
import AddUseInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

class Mycomponent extends React.Component {
  state = {
    listUsers: [
      { id: 1, name: "Thịnh", age: 25 },
      { id: 2, name: "Hsasd", age: 30 },
      { id: 3, name: "Lắqqe", age: 16 },
    ],
  };

  handleAddNewUser = (objUserNew) => {
    // console.log(objUserNew);
    this.setState({
      listUsers: [objUserNew, ...this.state.listUsers],
    });
  };

  handleDeleteUser = (userId) => {
    let listUsersClone = [...this.state.listUsers];
    let listUserNew = listUsersClone.filter((item) => item.id !== userId);
    this.setState({
      listUsers: listUserNew,
    });
  };

  //JSX
  render() {
    // DRY: Don't Repeat yourseft
    return (
      <>
        <AddUseInfor handleAddNewUser={this.handleAddNewUser} />
        <br />
        <DisplayInfor
          listUsers={this.state.listUsers}
          handleDeleteUser={this.handleDeleteUser}
        />
      </>
    );
  }
}

export default Mycomponent;
