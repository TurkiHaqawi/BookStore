import React, { useContext } from "react";
import TopBar from "./components/topBar/TopBar";
import AddBook from "./pages/addBook/AddBook";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Single from "./pages/single/Single";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Context } from "./context/Context";
import axios from "axios";
import BuyPage from "./pages/buyPage/BuyPage";

function App() {
  const { user } = useContext(Context);

  if (user) {
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = "Bearer " + user.accessToken;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  return (
    <Router>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {<Route path="/addBook" element={user ? <AddBook /> : <Register />} />}
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/buyPage" element={user ? <BuyPage /> : <Login />} />

        <Route path="/book/:bookId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
