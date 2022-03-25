import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isRegister, setIsRegister] = useState(false);

  const changeFormLogin = () => {
    setIsLogin(true);
    setIsRegister(false);
  };
  const changeFormRegister = () => {
    setIsLogin(false);
    setIsRegister(true);
  };

  return (
    <section
      className='bg-img'
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/homeBG.jpg"})`,
      }}
    >
      <section className='h-100'>
        <header className='container h-100'>
          <div className='d-flex align-items-center justify-content-center h-100'>
            <div className='d-flex flex-column'>
              <div className='card mb-2 p-2 text-center'>
                <p className='p-0 m-0'>Messenger</p>
              </div>
              <div className='card  p-3'>
                <div className='wrapper d-flex justify-content-between'>
                  <span
                    className='btn btn-custom'
                    onClick={changeFormLogin}
                    disabled={isLogin}
                  >
                    Login
                  </span>
                  <span
                    className='btn btn-custom'
                    onClick={changeFormRegister}
                    disabled={isRegister}
                  >
                    Sign up
                  </span>
                </div>
                <section className='forms'>
                  <Login isLogin={isLogin} />
                  <Register
                    isRegister={isRegister}
                    setIsRegister={setIsRegister}
                    setIsLogin={setIsLogin}
                    isLogin={isLogin}
                  />
                </section>
              </div>
            </div>
          </div>
        </header>
      </section>
    </section>
  );
}
