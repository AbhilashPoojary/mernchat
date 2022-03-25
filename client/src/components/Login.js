import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../actions";

export default function Login({ isLogin }) {
  const dispatch = useDispatch();
  const display = isLogin ? "block" : "none";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginHandler = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(loginUser(user));
  };
  return (
    <>
      <form
        className='mt-3'
        style={{ display: display }}
        onSubmit={loginHandler}
      >
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
        <button className='btn btn-custom'>Login</button>
      </form>
    </>
  );
}
