import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatBox({ currentchat, user, socket }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [delMsg, setDelMsg] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef();
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };
  socket.current.on("userCount", function (data) {
    console.log(data);
  });
  const emitDelete = async (messageId) => {
    const remainingMsg = messages.filter((delMsg) => delMsg._id !== messageId);
    const deletedMsg = messages.filter((delMsg) => delMsg._id === messageId);
    setMessages(remainingMsg);
    socket.current.emit("delete-msg", {
      from: user._id,
      to: currentchat._id,
      message: deletedMsg[0].message,
      _id: deletedMsg[0]._id,
    });
  };

  const handleEmojiClick = (event, emojiObject) => {
    let msg = message;
    msg += emojiObject.emoji;
    setMessage(msg);
  };

  useEffect(() => {
    const loadChats = async () => {
      const res = await axios.post("/messages/getmessage", {
        from: user?._id,
        to: currentchat?._id,
      });
      setMessages(res.data);
    };
    loadChats();
  }, [currentchat]);
  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentchat) {
        await JSON.parse(localStorage.getItem("currentUser"))._id;
      }
    };
    getCurrentChat();
  }, [currentchat]);

  const sendChat = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/messages/addmessage", {
      from: user._id,
      to: currentchat._id,
      message,
    });
    if (message) {
      socket.current.emit("send-msg", {
        from: user._id,
        to: currentchat._id,
        message: data.message.text,
        _id: data._id,
      });

      const msgs = [...messages];
      msgs.push({
        fromSelf: true,
        message: data.message.text,
        _id: data._id,
      });
      setMessages(msgs);
      setMessage("");
    } else {
      toast.error("Type something to send message", {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg.message,
          _id: msg._id,
        });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setMessages([...messages, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("delete-msg-receive", (msg) => {
        console.log(msg);
        setDelMsg({
          fromSelf: false,
          message: msg.message,
          _id: msg._id,
        });
      });
    }
  }, []);
  useEffect(() => {
    const remaining = messages.filter((item) => item._id !== delMsg._id);
    setMessages(remaining);
  }, [delMsg]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <div className='w-66 mt-2 me-2'>
        <div className='p-2 user-right rounded-3'>
          <div className='messageWrapper'>
            {messages?.map((msg) => {
              return (
                <div ref={scrollRef} key={msg._id}>
                  <Message
                    own={msg.fromSelf ? true : false}
                    msg={msg}
                    currentchat={currentchat}
                    user={user}
                    socket={socket}
                    emitDelete={emitDelete}
                  />
                </div>
              );
            })}
            <div className='button-container'>
              <div className='emoji'>
                {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
              </div>
            </div>
          </div>

          <div className='chatbox-bottom'>
            <form onSubmit={sendChat} className='chatBoxBottom'>
              <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
              <textarea
                className='chatMessageInput me-1'
                placeholder='write something...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>

              <button className='chatSubmitButton'>Send</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
