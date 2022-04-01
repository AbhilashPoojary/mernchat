import React, { useState } from "react";
import Footer from "./Footer";
// import { useSelector } from "react-redux";

export default function UserList({ users, changeChat }) {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const changeSelected = (index, user) => {
    setCurrentSelected(index);
    changeChat(user);
  };
  return (
    <div className='w-33 ms-2 mt-2 position-relative'>
      <div className='p-2 user-left rounded-3'>
        <h2 className='mb-2'>Start conversation</h2>
        <hr />
        {users?.map((user, index) => {
          return (
            <div
              className={`chat-users rounded-3 p-2 mb-2 d-flex ${
                currentSelected === index ? "active" : ""
              }`}
              onClick={() => changeSelected(index, user)}
              key={user._id}
            >
              <img
                src={
                  user.profilePicture ||
                  "https://nwsid.net/wp-content/uploads/2015/05/dummy-profile-pic.png"
                }
                className='rounded-circle me-3'
                alt={user.username}
              />
              <h5>{user.username}</h5>
            </div>
          );
        })}
        <Footer />
      </div>
    </div>
  );
}
