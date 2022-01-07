import React, { useContext } from "react";
import TopBar from "./components/topBar/TopBar";
import AddBook from "./pages/addBook/AddBook";
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Single from './pages/single/Single'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { Context } from "./context/Context";
import axios from "axios";
import BuyPage from "./pages/buyPage/BuyPage";

function App() {
  
  
  const {user} = useContext(Context)

  if(user) {
    axios.interceptors.request.use(
      (config) => {
      config.headers.authorization = "Bearer " + user.accessToken
      return config;
    }, 
    (error) => {
      return Promise.reject(error)
    })
  }

  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        {<Route path="/addBook"> {user ? <AddBook />  : <Register /> } </Route>}
        <Route path="/login"> {user ? <Home /> : <Login />} </Route>
        <Route path="/register"> {user ? <Home /> : <Register />} </Route>
        <Route path="/buyPage"> {user ? <BuyPage /> : <Login />} </Route>

        <Route path="/book/:bookId">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
