import React, { useState,useEffect, useReducer } from 'react'
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./AppliedRoute";
import LogIn from "./LogIn";
import Main from "./Main";

const InitUserSession = {   
  userId: null,
  username: "",
  sessionId: null,
  sessionDT: null
};

export default function Routes( ) {
  const [isLogin, setIsLogin] = useState(false);
  const [userSession, setUserSession] = useReducer((state, newState) => ({ ...state, ...newState }), InitUserSession)
  const [userAccesRights, setUserAccesRights] = useState([]);
console.log("route")
  useEffect(() => {	
     console.log("Routes userSession")
     console.log("isLogin = " + isLogin)
     console.log(userSession)
  }, [userSession])

  return (
    <Switch>
       {/* <Route exact path="/" render={(props) => <LogIn {...props} isLogin={isLogin} setIsLogin={setIsLogin} />} />   */}
      <AppliedRoute exact path="/"  component={LogIn} appProps={{isLogin, setIsLogin, setUserSession}} /> 
      <AppliedRoute path="/Main"    component={Main} appProps={{isLogin, setIsLogin, userSession, setUserSession}} />    
      {/* <Route component={LogIn} /> */}
    </Switch>
  );
}