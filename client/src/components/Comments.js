import React, { useState } from "react";
import { BiSend } from "react-icons/bi";

export default function Comments({
  updateCommnet,
  postId,
  postComment,
  showcmt,
  scrollRef,
}) {
  const [comment, setComment] = useState("");
  const sendComment = (e) => {
    e.preventDefault();
    updateCommnet(comment, postId);
    setComment("");
  };
  const showComment = showcmt ? "d-block" : "d-none";
  const allComments = postComment?.map((com) => {
    return (
      <div key={com._id} ref={scrollRef}>
        <span className='fw-bold me-2'>{com?.userName}:</span>
        <span>{com?.text}</span>
      </div>
    );
  });
  return (
    <section className={`post-comment mt-2 ${showComment}`}>
      {postComment?.length > 0 ? (
        <div className='comment-section'>{allComments}</div>
      ) : (
        ""
      )}

      <form
        className='d-flex justify-content-between comment-form'
        onSubmit={sendComment}
      >
        <input
          type='text'
          className='form-control'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type='submit' className='comment-btn'>
          <BiSend />
        </button>
      </form>
      {/* <div className='messageBottom'>{moment(msg.createdAt).format("LT")}</div> */}
    </section>
  );
}
