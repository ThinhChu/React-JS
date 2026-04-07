import React from "react";
import "./style/DisplayInfor.scss";
// import logo from "../logo.svg";

class DisplayInfor extends React.Component {
  constructor(props) {
    console.log("check constructor");

    super(props);
    //Babel compiler
    this.state = {
      isShowListUsers: true,
    };
  }

  handleShowHide = (e) => {
    // console.log(this.state.isShowListUsers);
    // !this.state.isShowListUsers lấy giá trị ngược lại với giá trị ban đầu
    this.setState({
      isShowListUsers: !this.state.isShowListUsers,
    });
  };

  componentDidMount() {
    console.log("check componentDidMount");
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("check componentDidUpdate");
  }

  render() {
    console.log("check render");
    // console.log(this.props);
    // Destructuring array/object
    const { listUsers } = this.props;
    // console.log(listUsers);

    return (
      <div className="displayInforItem">
        {/* <img src={logo} alt="sfsdfsd" /> */}
        <div>
          <button onClick={this.handleShowHide}>
            {this.state.isShowListUsers ? "Hide" : "Show"}
          </button>
        </div>
        {this.state.isShowListUsers && (
          <div>
            {listUsers.map((user) => {
              return (
                // +user.age (+) đứng trước biến đổi kiểu (type) giá trị thành number
                <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                  <div>My name is {user.name}</div>
                  <div>I'm {user.age}</div>
                  <button
                    onClick={() => {
                      this.props.handleDeleteUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                  <hr />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DisplayInfor;
