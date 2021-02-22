import React, { useState,useEffect, useReducer } from 'react'
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./AppliedRoute";
import LogIn from "./LogIn";
import Main from "./Main";


export default function RoutesChild( ) {
  const [isLogin, setIsLogin] = useState(false);
  const [userSession, setUserSession] = useReducer((state, newState) => ({ ...state, ...newState }), InitUserSession)
  const [userAccesRights, setUserAccesRights] = useState([]);

  useEffect(() => {	
     console.log("Routes userSession")
     console.log("isLogin = " + isLogin)
     console.log(userSession)
  }, [userSession])

  return (
    <Switch>
       {/* <Route path="/MoviesList2" render={(props) => <MoviesList2 {...props} setMovieList2MsgBar={setMsgBar} compUserAccess={userAccesRights} />} />  */}
       <AppliedRoute path="/MoviesList2" component={MoviesList2} appProps={{isLogin, setIsLogin, userSession}} />   
    </Switch>
  );
}