import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register({
  isRegister,
  setIsRegister,
  setIsLogin,
  isLogin,
}) {
  const display = isRegister ? "block" : "none";

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [picLoading, setPicLoading] = useState(false);
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

        setProfilePicture(res.data.url);
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

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error("Password dont match", {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      const user = {
        username,
        email,
        password,
        profilePicture,
      };
      try {
        await axios.post("/auth/register", user);
        setIsRegister(!isRegister);
        setIsLogin(!isLogin);
        clearFields();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const clearFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmpassword("");
    setProfilePicture("");
  };
  return (
    <>
      <form
        className='mt-3'
        style={{ display: display }}
        onSubmit={submitHandler}
      >
        <div className='mb-3'>
          <label htmlFor='name' className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            name='name'
            placeholder='abc'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email Address:
          </label>
          <input
            type='email'
            className='form-control'
            name='email'
            placeholder='abc@mymail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='passwod' className='form-label'>
            Password:
          </label>
          <input
            type='text'
            className='form-control'
            name='passwod'
            placeholder='*******'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='cpasswod' className='form-label'>
            Confirm Password:
          </label>
          <input
            type='text'
            className='form-control'
            name='cpasswod'
            placeholder='*******'
            value={confirmpassword}
            onChange={(e) => setConfirmpassword(e.target.value)}
            required
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='formFileSm' className='form-label'>
            Upload profile pic
          </label>
          <input
            className='form-control form-control-sm'
            name='formFileSm'
            type='file'
            accept='image/*'
            onChange={(e) => postDetails(e.target.files[0])}
            required
          />
        </div>
        <button className='btn btn-custom'>Sign In</button>
        {picLoading && (
          <div className='spinner-border spinner-border-sm ms-2' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
        )}
      </form>
      <ToastContainer />
    </>
  );
}
