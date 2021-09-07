import _ from 'lodash'
//import PropTypes from 'prop-types'
import React,   {useState, useEffect, useReducer} from 'react'
import {
  Icon,
  Menu,
  Segment,
  Sidebar
} from 'semantic-ui-react'
import {
	Route,
	Link,
  HashRouter
  } from "react-router-dom";


//import HorizontalTopBarMenu from "./HorizontalTopBarMenu"  
import Home from "./Home";
import UsersAccessList from "./UsersAccessList";
import EmployeeList from "./EmployeeList";
import EmployeeAVEDTabs from "./EmployeeAVEDTabs";
import SkillList from "./SkillList";
import SkillAVEDTabs from "./SkillAVEDTabs";

const VerticalSidebar = ({ animation, direction, visible,userAccessRights, isLogin }) => {
  console.log("VerticalSidebar function component")
  console.log("isLogin = " + isLogin)
  console.log(userAccessRights)
  console.log("userAccessRights.length = " + userAccessRights.length )
  console.log(userAccessRights)

  if (isLogin) {
    return (
        <HashRouter>
            <Sidebar
              as={Menu}
              animation={animation}
              direction={direction}
              icon='labeled'
              inverted
              vertical
              visible={visible}
              width='thin'
            >
            
              {_.map(userAccessRights, ({ modId, modName, modComponentPath}) => (
                  <Menu.Item name={modName} as={Link} to={modComponentPath} key={modId}>
                  {modName}
                  </Menu.Item>
              ))}  

            </Sidebar>
        </HashRouter>
    )
  }
  else {
    return (
      <Sidebar
      as={Menu}
      animation={animation}
      direction={direction}
      icon='labeled'
      inverted
      vertical
      visible={visible}
      width='thin'
      ></Sidebar>
    )

  }
 
}

// VerticalSidebar.propTypes = {
//   animation: PropTypes.string,
//   direction: PropTypes.string,
//   visible: PropTypes.bool,
// }

const InitMsgBarVar = {
  msgText : "Initial Message",
  visibleMsgBar: false,
  colorMsgBar: 'green',
  counter : 0
};

const InitTempVar = {
  modAllowDelete: "Y",
  modAllowInsert: "Y",
  modAllowUpdate: "Y",
  modAllowView: "Y",
  modComponent: null,
  modComponentPath: "",
  modId: null,
  modName: "",
  userID: 2,
  userName: "user1"
};

const componentList = {
  Home: Home,
  EmployeeList: EmployeeList,
  UsersAccessList: UsersAccessList
}
const Home12 = componentList['Home'];

const VerticalSideBarMenu = props => {    
  //const [animation, setAnimation] = useState('overlay');
  const [animation, setAnimation] = useState('push');
  const [direction, setDirection] = useState('left');
  //const [dimmed, setDimmed] = useState(false);
  const [msgBar, setMsgBar] = useReducer((state, newState) => ({ ...state, ...newState }), InitMsgBarVar)
  const [userAccessRights, setUserAccessRights] = useState(props.userAccessRightsVSBM);
  const [isLogin, setIsLogin] = useState(props.isLogin);
 

  useEffect(() => {
    handleAnimationChange ('left')
    setIsLogin (props.isLogin)
  }, [props.visibleVerticalBarMenu]);
  
  useEffect(() => {
    setUserAccessRights(props.userAccessRightsVSBM)
    console.log("props.userAccessRightsVSBM")
    console.log(props.userAccessRightsVSBM)
  }, [props.userAccessRightsVSBM,userAccessRights]);

  useEffect(() => {
    props.setVSBMMsgBar(msgBar)
  }, [msgBar]);


  const handleAnimationChange = (animation) => () => {
    //this.setState((prevState) => ({ animation, visible: !prevState.visible }))
    setDirection('left')
    setAnimation(animation);
    
    if (props.visibleVerticalBarMenu) {
      props.setVisibleVerticalBarMenu(false)
    }else {
      props.setVisibleVerticalBarMenu(true)
    }
  }
  
  return (
    <div>
      <Sidebar.Pushable  as={Segment} style={{marginTop:0,zIndex:0}}>
        
          <VerticalSidebar
            animation={animation}
            direction={direction}
            visible={props.visibleVerticalBarMenu}
            userAccessRights={props.userAccessRightsVSBM} 
            isLogin={props.isLogin}
            //visible={true}
          />
        
        <Sidebar.Pusher >
          <Segment basic  style={{overflow: 'auto', maxHeight: '90vh', minHeight: '90vh',marginTop:0}}>
            <HashRouter>
            <div>
				<Route exact path="/"/> 
              <Route exact path="/Home" component={Home}/> 
              <Route path="/EmployeeList" render={(props) => <EmployeeList {...props} setMsgBar={setMsgBar} userAccessRights={userAccessRights} sLogin={isLogin} />} />
              <Route path="/EmployeeView/:id" render={(props) => <EmployeeAVEDTabs {...props} setMsgBar={setMsgBar} userAccessRights={userAccessRights} isLogin={isLogin} tabMode={"View"} />} />
              <Route path="/EmployeeEdit/:id" render={(props) => <EmployeeAVEDTabs {...props} setMsgBar={setMsgBar} userAccessRights={userAccessRights} isLogin={isLogin} tabMode={"Edit"} />} />
              <Route path="/EmployeeDelete/:id" render={(props) => <EmployeeAVEDTabs {...props} setMsgBar={setMsgBar} userAccessRights={userAccessRights} isLogin={isLogin} tabMode={"Delete"} />} />	
              <Route path="/EmployeeAdd" render={(props) => <EmployeeAVEDTabs {...props} setMsgBar={setMsgBar} userAccessRights={userAccessRights} isLogin={isLogin} tabMode={"Add"} />} />
              <Route path="/SkillList" render={(props) => <SkillList {...props} setMsgBar={setMsgBar} userAccessRights={userAccessRights} sLogin={isLogin} />} />
              <Route path="/SkillView/:id" render={(props) => <SkillAVEDTabs {...props} setMsgBar={setMsgBar} userAccessRights={userAccessRights} isLogin={isLogin} tabMode={"View"} />} />
              <Route path="/SkillEdit/:id" render={(props) => <SkillAVEDTabs {...props} setMsgBar={setMsgBar} userAccessRights={userAccessRights} isLogin={isLogin} tabMode={"Edit"} />} />
              <Route path="/SkillDelete/:id" render={(props) => <SkillAVEDTabs {...props} setMsgBar={setMsgBar} userAccessRights={userAccessRights} isLogin={isLogin} tabMode={"Delete"} />} />
              <Route path="/SkillAdd" render={(props) => <SkillAVEDTabs {...props} setMsgBar={setMsgBar} userAccessRights={userAccessRights} isLogin={isLogin} tabMode={"Add"} />} />
            </div>
          </HashRouter>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}

export default VerticalSideBarMenu;