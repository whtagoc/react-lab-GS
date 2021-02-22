import React, { useState,useEffect, useReducer } from 'react'
import {browserHistory} from 'react-router'
import axios from "axios";
import Main from "./Main";
import LogIn from "./LogIn";

import { Link, Redirect } from 'react-router-dom'

import Routes from "./Routes";

const InitUserSession = {   
    userId: null,
    username: "",
    sessionId: null,
    sessionDT: null
};

const Session = () => {    
  const [isLogin, setIsLogin] = useState(false);
  const [userSession, setUserSession] = useReducer((state, newState) => ({ ...state, ...newState }), InitUserSession)
  const [userAccesRights, setUserAccesRights] = useState([]);
  

return (<Routes />)
 
}


export default Session;