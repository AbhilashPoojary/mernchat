import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AiTwotoneLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
// import { BiCommentDetail } from "react-icons/bi";
import { FcComments } from "react-icons/fc";
import { GoKebabVertical } from "react-icons/go";
import { Dropdown } from "react-bootstrap";
import Comments from "./Comments";

export default function Posts({
  post,
  handleDeltePost,
  handleEditPost,
  handleUpdateLike,
  smHeight,
  handleUpdteComment,
  scrollRef,
}) {
  const user = useSelector((state) => state.loginReducer.currentUser);
  const [showcmt, setShowCmt] = useState(false);
  const updateLike = (postId, userId) => {
    handleUpdateLike(postId, userId);
  };
  const deletePost = (postId, postUserId) => {
    handleDeltePost(postId, postUserId);
  };
  const editPost = (post, userId) => {
    handleEditPost(post, userId);
  };
  const updateCommnet = (comment, postId) => {
    handleUpdteComment(comment, postId, user);
  };
  const fixHeight = smHeight ? "custom-height" : "";
  return (
    <div className='card mb-3 ms-3' style={{ width: "12rem" }}>
      {post.userId === user._id || user.isAdmin ? (
        <Dropdown className='ms-2'>
          <Dropdown.Toggle id='dropdown-basic' className='btn-dropdown'>
            <GoKebabVertical />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href='' onClick={() => editPost(post, user._id)}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              href=''
              onClick={() => deletePost(post._id, user._id)}
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      ) : (
        ""
      )}

      <img
        src={post?.postPicture}
        className={`card-img-top ${fixHeight}`}
        alt={post?.username}
      />
      <div className='card-body'>
        <div className='user-detail d-flex'>
          <div className='user'>
            <img
              src={post?.profilePicture}
              className='rounded-circle img-fluid w-30 h-30'
              alt={user?.username}
            />
          </div>
          <h5 className='ms-2'>{post?.username}</h5>
        </div>
        <p className='card-text'>{post?.postDescription}</p>

        <hr />
        <div className='card-footer-custom d-flex justify-content-around'>
          <span>
            {post?.likes?.includes(user?._id) ? (
              <AiTwotoneLike onClick={() => updateLike(post._id, user._id)} />
            ) : (
              <AiOutlineLike onClick={() => updateLike(post._id, user._id)} />
            )}

            {post?.likes?.length > 0 ? post?.likes?.length : ""}
          </span>
          <span>
            {/* <BiCommentDetail />6 */}
            <FcComments
              size='17'
              onClick={() => {
                setShowCmt(!showcmt);
                !showcmt &&
                  scrollRef.current.scrollIntoView({ behavior: "smooth" });
              }}
            />
            {post?.comments?.length > 0 ? post?.comments?.length : ""}
          </span>
        </div>
        <hr />
        <Comments
          updateCommnet={updateCommnet}
          postId={post._id}
          postComment={post?.comments}
          showcmt={showcmt}
          scrollRef={scrollRef}
        />
      </div>
    </div>
  );
}
