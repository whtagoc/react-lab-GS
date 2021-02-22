import React, { useState,useEffect, useReducer } from 'react'
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