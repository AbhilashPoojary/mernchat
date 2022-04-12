import React from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function TopBar() {
  const user = useSelector((state) => state.loginReducer.currentUser);
  // const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/";
  };
  return (
    <>
      <nav className='d-flex justify-content-between w-100 p-3 align-items-center'>
        <div className='items w-50'>
          <Link
            to='/chat'
            className='m-0'
            style={{ textDecoration: "none", color: "#000" }}
          >
            Messenger
          </Link>
        </div>
        <div className='items d-flex justify-content-end items w-50 align-items-center'>
          {/* <span className='me-2'>
          <BellFill size={20} />
        </span> */}
          <Link
            to='/posts'
            style={{
              textDecoration: "none",
              color: "#000",
              marginRight: "5px",
            }}
          >
            Posts
          </Link>
          <div className='user'>
            <img
              src={user?.profilePicture}
              className='rounded-circle img-fluid w-30 h-30'
              alt={user?.username}
            />
          </div>
          {user && (
            <Dropdown className='ms-2'>
              <Dropdown.Toggle id='dropdown-basic' className='btn-dropdown'>
                <span className=''>{user?.username}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href='' onClick={handleLogout}>
                  logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </nav>
    </>
  );
}
