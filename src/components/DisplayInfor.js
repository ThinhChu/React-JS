import React, { useEffect, useState } from "react";
import "./style/DisplayInfor.scss";
// import logo from "../logo.svg";

// class DisplayInfor extends React.Component {

//   render() {
//     // Destructuring array/object
//     const { listUsers } = this.props;
//     // console.log(listUsers);

//     return (
//       <div className="displayInforItem">

//         {true && (
//           <div>
//             {listUsers.map((user) => {
//               return (
//                 // +user.age (+) đứng trước biến đổi kiểu (type) giá trị thành number
//                 <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
//                   <div>My name is {user.name}</div>
//                   <div>I'm {user.age}</div>
//                   <button
//                     onClick={() => {
//                       this.props.handleDeleteUser(user.id);
//                     }}
//                   >
//                     Delete
//                   </button>
//                   <hr />
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   }
// }

const DisplayInfor = (props) => {
  const { listUsers } = props;
  const [isShowListUsers, setShowHideListUser] = useState(true);

  const handleShowHideListUsers = () => {
    setShowHideListUser(!isShowListUsers);
  };

  // componentDidMount chỉ chạy 1 lần sau khi component được render lần đầu tiên
  useEffect(() => {
    setTimeout(() => {
      alert("Hello world");
    }, 3000);
  }, []);

  // componentDidUpdate chạy sau khi component được cập nhật (render lại) và có sự thay đổi về props hoặc state hoặc theo điều kiện
  useEffect(() => {
    if (listUsers.length === 0) {
      alert("You have deleted all the users");
    }
  }, [listUsers]);

  return (
    <div className="displayInforItem">
      <div onClick={handleShowHideListUsers}>
        {isShowListUsers ? "Hide list users" : "Show list users"}
      </div>
      {isShowListUsers && (
        <div>
          {listUsers.map((user) => {
            return (
              // +user.age (+) đứng trước biến đổi kiểu (type) giá trị thành number
              <div key={user.id} className={+user.age > 18 ? "green" : "red"}>
                <div>My name is {user.name}</div>
                <div>I'm {user.age}</div>
                <button
                  onClick={() => {
                    props.handleDeleteUser(user.id);
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
};

export default DisplayInfor;
