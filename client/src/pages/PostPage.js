import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Posts from "../components/Posts";
import TopBar from "../components/TopBar";
import PostForm from "../components/PostForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostPage() {
  //useselector
  const user = useSelector((state) => state.loginReducer.currentUser);

  //local state
  const [posts, setPosts] = useState([]);
  const [postPicture, setpostPicture] = useState("");
  const [picLoading, setPicLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [postUpdateId, setPostUpdateId] = useState("");
  const [smHeight, setSmHeight] = useState(false);

  //refs
  const scrollRef = useRef();

  // functions
  const formSubmitHandler = async (
    postPicture,
    postDescription,
    clearFields
  ) => {
    const postData = {
      postPicture,
      postDescription,
      username: user.username,
      profilePicture: user.profilePicture,
      userId: user._id,
      postId: postUpdateId,
    };
    try {
      const res = await axios.post("/posts/add-posts", postData);
      if (postUpdateId) {
        const editedPost = posts.map((posts) =>
          posts._id === res.data._id ? res.data : posts
        );
        setPosts(editedPost);
        clearFields();
        toast.success("Post updated successfully", {
          position: "bottom-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
        });
        postUpdateId("");
      } else {
        setPosts([...posts, res.data]);
        clearFields();
        toast.success("Post added successfully", {
          position: "bottom-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeltePost = async (postId, postUserId) => {
    console.log(postId, postUserId);
    try {
      await axios.post("/posts/delete-post", { postId, postUserId });
      const afterDelete = posts.filter((post) => post._id !== postId);
      setPosts(afterDelete);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPost = (post) => {
    console.log(post);
    setpostPicture(post.postPicture);
    setDescription(post.postDescription);
    setPostUpdateId(post._id);
  };

  const handleUpdateLike = async (postId, userId) => {
    try {
      const res = await axios.post("/posts/like-post", { postId, userId });
      const likedPost = posts.map((post) =>
        post._id === res.data._id ? res.data : post
      );
      setPosts(likedPost);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdteComment = async (comment, postId, user) => {
    const commentData = {
      postId,
      userId: user._id,
      userName: user.username,
      userPic: user.profilePicture,
      text: comment,
    };
    try {
      const res = await axios.post("/posts/comment-post", commentData);
      const commentedPost = posts.map((post) =>
        post._id === res.data._id ? res.data : post
      );
      setPosts(commentedPost);
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get(`/posts/all-posts`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);
  return (
    <section className='container'>
      <TopBar />
      <span className='d-flex justify-content-end mt-4 me-3 custom-checkbox'>
        <label htmlFor='height' className='me-5' style={{ lineHeight: "1rem" }}>
          Check this to view same height images
        </label>
        <input
          type='checkbox'
          name='height'
          value={smHeight}
          checked={smHeight ? "checked" : ""}
          onChange={() => setSmHeight(!smHeight)}
        />
        <span className='checkmark'></span>
      </span>
      <div>
        <section className='d-flex mt-3 ms-2'>
          <PostForm
            formSubmitHandler={formSubmitHandler}
            postPicture={postPicture}
            setpostPicture={setpostPicture}
            picLoading={picLoading}
            setPicLoading={setPicLoading}
            description={description}
            setDescription={setDescription}
          />
          <div
            className='d-flex flex-wrap mt-3 justify-content-end'
            style={{ width: "75%" }}
          >
            {posts.map((post) => (
              <Posts
                key={post._id}
                post={post}
                handleDeltePost={handleDeltePost}
                handleEditPost={handleEditPost}
                handleUpdateLike={handleUpdateLike}
                smHeight={smHeight}
                handleUpdteComment={handleUpdteComment}
                scrollRef={scrollRef}
              />
            ))}
          </div>
        </section>
      </div>
      <ToastContainer />
    </section>
  );
}
