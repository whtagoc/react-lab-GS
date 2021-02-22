import React,   {useState, useEffect, useReducer} from 'react'
import { Form, Input,  Button, Grid } from 'semantic-ui-react'
import axios from "axios";
import HorizontalTopBarMenu from "./HorizontalTopBarMenu"  
import Routes from "./Routes";

const InitMsgBarVar = {
  msgText : "Initial Message",
  visibleMsgBar: false,
  colorMsgBar: 'green',
  counter : 0
};



const Main = props => {    
  const [visibleVerticalBar, setVisibleVerticalBar] = useState(false);
  const [mainMsgBar, setMainMsgBar] = useReducer((state, newState) => ({ ...state, ...newState }), InitMsgBarVar);
  const [userAccessRights, setUserAccessRights] = useState([]);
  const [isLogin, setIsLogin] = useState(props.isLogin);
 

  
  console.log("main = " + isLogin )


  // useEffect(() => {	
  //   setUserAccesRights(props.userAccesRightsMain)
  //   console.log("props.userAccesRightsMain")
  //   console.log(props.userAccesRightsMain)
  // }, [props.userAccesRightsMain])

  // useEffect(() => {	
  //   if (props.isLogin) {


  //   }

  // }, [props.isLogin])

  useEffect(() => {	
    console.log("Main userEffect")
    console.log("props.isLogin = " + props.isLogin) 
    console.log("isLogin = " + isLogin) 
    console.log("props.userSession " + props.userSession) 
    console.log(props.userSession) 
    setIsLogin(props.isLogin)
    if (isLogin) {
      
      const data = { 
        "Id" : props.userSession.userId
        };
        
        var url = 'https://localhost:5001/api/users/GetUserAccessRights' 
  
        axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
          }	
        })
        .then(response => { 
          console.log("GetUserAccessRights success")
          console.log("data.id = " + data.Id)
          console.log(response.data)
          if (response.data.length > 0) {
            setUserAccessRights(response.data)
            console.log("Session userAccessRights = " + userAccessRights)
          }
          else {
            setUserAccessRights([])
          }	
        })
        .catch(error => {
          console.log("GetUserAccessRights failed")
          console.log(error.response)
          setUserAccessRights([])	
        });
    } else {
      Logout ( )
    }
   
  }, [isLogin])

  const Logout = (event) => {
    setIsLogin(false)
    props.setIsLogin(isLogin)
    props.setUserSession("")
    setUserAccessRights([])
    props.history.push("/") 
	}

  return (
    <div>
        <HorizontalTopBarMenu 
        //handleClickMenu={handleAnimationChange('push')} 
        SideBarVisible={visibleVerticalBar} 
           hTBMMsgBar ={mainMsgBar}
        setHTBMMsgBar = {setMainMsgBar}
        setIsLogin ={setIsLogin}
        isLogin={isLogin}
        Logout={Logout}
        userSession={props.userSession} 
        userAccessRightsHTBM = {userAccessRights}
      
      />
    </div>
  )
}

export default Main;