import React from "react";
import HomePage from "./pages/HomePage";
import ChatPage from "./pages/ChatPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const user = useSelector((state) => state.loginReducer.currentUser);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={!user ? <HomePage /> : <Navigate to='/chat' />}
        ></Route>
        <Route
          path='/chat'
          element={user ? <ChatPage /> : <Navigate to='/' />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
