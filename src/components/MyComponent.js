// class component
// function component

import React from "react";
import UseInfo from "./UserInfo";
import DisplayInfor from "./DisplayInfor";

class Mycomponent extends React.Component {
  //JSX
  render() {
    const myInfor = ["a", "b", "c"];
    return (
      <div>
        <UseInfo />
        <br />
        <DisplayInfor name={"Th"} age={15} myInfor={myInfor} />
      </div>
    );
  }
}

export default Mycomponent;
