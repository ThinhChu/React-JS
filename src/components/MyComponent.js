// class component
// function component

import React, { useState } from "react";
import AddUseInfor from "./AddUserInfor";
import DisplayInfor from "./DisplayInfor";

// class Mycomponent extends React.Component {
//   state = {
//     listUsers: [
//       { id: 1, name: "Thịnh", age: 25 },
//       { id: 2, name: "Hsasd", age: 30 },
//       { id: 3, name: "Lắqqe", age: 16 },
//     ],
//   };

//   handleAddNewUser = (objUserNew) => {
//     // console.log(objUserNew);
//     this.setState({
//       listUsers: [objUserNew, ...this.state.listUsers],
//     });
//   };

//   handleDeleteUser = (userId) => {
//     let listUsersClone = [...this.state.listUsers];
//     let listUserNew = listUsersClone.filter((item) => item.id !== userId);
//     this.setState({
//       listUsers: listUserNew,
//     });
//   };

//   //JSX
//   render() {
//     // DRY: Don't Repeat yourseft
//     return (
//       <>
//         <AddUseInfor handleAddNewUser={this.handleAddNewUser} />
//         <br />
//         <DisplayInfor
//           listUsers={this.state.listUsers}
//           handleDeleteUser={this.handleDeleteUser}
//         />
//       </>
//     );
//   }
// }

const MyComponent = (props) => {
  const [listUsers, setListUsers] = useState([
    { id: 1, name: "Thịnh", age: 25 },
    { id: 2, name: "Hsasd", age: 30 },
    { id: 3, name: "Lắqqe", age: 16 },
  ]);

  const handleAddNewUser = (objUserNew) => {
    // console.log(objUserNew);
    setListUsers([objUserNew, ...listUsers]);
  };

  const handleDeleteUser = (userId) => {
    let listUsersClone = [...listUsers];
    let listUserNew = listUsersClone.filter((item) => item.id !== userId);
    setListUsers(listUserNew);
  };

  return (
    <>
      <AddUseInfor handleAddNewUser={handleAddNewUser} />
      <br />
      <DisplayInfor listUsers={listUsers} handleDeleteUser={handleDeleteUser} />
    </>
  );
};

export default MyComponent;
