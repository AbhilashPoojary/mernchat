import React, { useRef } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PostForm({
  formSubmitHandler,
  postPicture,
  setpostPicture,
  picLoading,
  setPicLoading,
  description,
  setDescription,
}) {
  const inputRef = useRef("");
  const postDetails = async (pic) => {
    setPicLoading(true);
    if (pic === undefined) {
      toast.error("Please select an image", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
      });
      alert("Please select an image");
      return;
    }
    if (
      pic.type === "image/jpeg" ||
      pic.type === "image/jpg" ||
      pic.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pic);
      data.append("api_key", "719368821484965");
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dk0sqc1u9");
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/dk0sqc1u9/image/upload",
          data
        );

        setpostPicture(res.data.url);
        console.log(res.data.url);
        setPicLoading(false);
        toast.success("image uploaded successfully", {
          position: "bottom-right",
          autoClose: 3000,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.log(error);
        setPicLoading(false);
      }
    } else {
      toast.error("Please select a image", {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };
  const updatepostData = (e) => {
    e.preventDefault();
    if (!postPicture) {
      toast.error("Please select a image", {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
      });
      return false;
    }
    formSubmitHandler(postPicture, description, clearFields);
  };
  const clearFields = () => {
    setDescription("");
    setpostPicture("");
    inputRef.current.value = "";
  };
  console.log(inputRef);

  return (
    <div className='add-post me-3' style={{ width: "23%" }}>
      <form className='mt-3' onSubmit={updatepostData}>
        <div className='mb-3'>
          <label htmlFor='formFileSm' className='form-label'>
            Upload pic
          </label>
          <input
            className='form-control form-control-sm'
            name='formFileSm'
            type='file'
            accept='image/*'
            onChange={(e) => postDetails(e.target.files[0])}
            ref={inputRef}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='description' className='form-label'>
            Description
          </label>
          <textarea
            type='text'
            className='form-control'
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='description'
            required
          />
        </div>
        <button className='btn btn-custom'>Add Post </button>
        {picLoading && (
          <div className='spinner-border spinner-border-sm ms-2' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        )}
      </form>
      <ToastContainer />
    </div>
  );
}
