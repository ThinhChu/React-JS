import React from "react";
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
  return (
    <div className="displayInforItem">
      {true && (
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
