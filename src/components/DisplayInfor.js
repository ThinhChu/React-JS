import React from "react";

class DisplayInfor extends React.Component {
  render() {
    // console.log(this.props);
    // Destructuring array/object
    const { name, age } = this.props;
    return (
      <div>
        <div>My name is {name}</div>
        <div>I'm {age}</div>
      </div>
    );
  }
}

export default DisplayInfor;
