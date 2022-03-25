import React, { useEffect, useState, useRef } from "react";
import Message from "./Message";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Picker from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatBox({ currentchat, user, socket }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef();
  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
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
    if (message) {
      socket.current.emit("send-msg", {
        from: user._id,
        to: currentchat._id,
        message: message,
      });
      await axios.post("/messages/addmessage", {
        from: user._id,
        to: currentchat._id,
        message,
      });

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: message });
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
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <>
      <div className='w-66 mt-2 me-2'>
        <div className='p-2 user-right rounded-3'>
          {/* <div className='user'>
            <img
              src={currentchat?.profilePicture}
              className='rounded-circle img-fluid w-30 h-30'
              alt={currentchat.username}
            />
          </div> */}
          <div className='messageWrapper'>
            {messages?.map((msg) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <Message
                    own={msg.fromSelf ? true : false}
                    msg={msg}
                    currentchat={currentchat}
                    user={user}
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

          <div>
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
