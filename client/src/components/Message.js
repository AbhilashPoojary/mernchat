import React, { useRef } from "react";
import axios from "axios";
import moment from "moment";
import { BsFillTrashFill } from "react-icons/bs";

export default function Message({ own, msg, user, currentchat, emitDelete }) {
  const showHideIcons = own;
  const deleteEl = useRef(false);
  const enableBtn = () => {
    if (showHideIcons) {
      deleteEl?.current?.style.display === "block"
        ? (deleteEl.current.style.display = "none")
        : (deleteEl.current.style.display = "block");
    }
  };
  const handleDltDbMsg = async (messageId, senderId) => {
    try {
      await axios.post("/messages/deletemessage", {
        messageId,
        senderId,
      });
      emitDelete(messageId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={own ? "message own" : "message"}>
      <div className='messageTop'>
        <img
          className='messageImg'
          src={own ? user?.profilePicture : currentchat?.profilePicture}
          alt='img'
        />
        <p className='messageText' onClick={() => enableBtn()}>
          {msg.message}
        </p>
        {showHideIcons && (
          <span
            ref={deleteEl}
            style={{ display: "none", color: "#ff0000" }}
            onClick={() => handleDltDbMsg(msg._id, user._id)}
          >
            <BsFillTrashFill />
          </span>
        )}
      </div>
      <div className='messageBottom'>{moment(msg.createdAt).format("LT")}</div>
    </div>
  );
}
