import React, { useEffect, useState, useRef } from "react";
import ChatBox from "../components/ChatBox";
import axios from "axios";
import TopBar from "../components/TopBar";
import UserList from "../components/UserList";
import { useSelector } from "react-redux";
import Welcome from "../components/Welcome";
import { io } from "socket.io-client";

export default function ChatPage() {
  const [users, setUsers] = useState([]);
  const [currentchat, setCurrentChat] = useState(undefined);
  const user = useSelector((state) => state.loginReducer.currentUser);
  const socket = useRef();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`/users/all/${user?._id}`);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [user?._id]);
  useEffect(() => {
    if (user) {
      socket.current = io("http://localhost:8800");
      socket.current.emit("add-user", user._id);
    }
  }, [user]);

  const changeChat = (user) => {
    setCurrentChat(user);
  };

  return (
    <section className='container'>
      <div>
        <TopBar />
      </div>
      <section
        className='bg-img'
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + "/homeBG.jpg"})`,
        }}
      >
        <div className='d-flex justify-content-between w-100 gap-1'>
          <UserList users={users} changeChat={changeChat} />
          {currentchat === undefined ? (
            <Welcome />
          ) : (
            <ChatBox currentchat={currentchat} user={user} socket={socket} />
          )}
        </div>
      </section>
    </section>
  );
}
