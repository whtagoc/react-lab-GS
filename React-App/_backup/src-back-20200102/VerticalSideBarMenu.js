import _ from 'lodash'
import PropTypes from 'prop-types'
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
import AppliedRoute from "./AppliedRoute";

import HorizontalTopBarMenu from "./HorizontalTopBarMenu"  
import Home from "./Home";
import MoviesList2 from "./MoviesList2";
import MovieEdit from "./MovieEdit";
import MovieAddForm from "./MovieAddForm";
import MovieDelete from "./MovieDelete";
import EmployeeList from "./EmployeeList";
import UsersAccessList from "./UsersAccessList";
import ProjectList from "./ProjectList";
import ProjectEditTabs from "./ProjectEditTabs";



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
            
            {/* (<Menu.Item name="Home" as={Link} to="/Home">
                Home
              </Menu.Item>
              <Menu.Item name="Movies" as={Link} to="/MoviesList2">
                Movies
              </Menu.Item>
              <Menu.Item as='a'>
                Employees
              </Menu.Item>
              <Menu.Item as='a'>
                User Access
            </Menu.Item> ) */}
            
              {/* {_.map(userAccesRights, ({ modId, modName, modComponentPath}) => (
                  <Menu.Item name={modName} as={Link} to={modComponentPath} key={modId}>
                  {modName}
                  </Menu.Item>
              ))}  */}

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
  MoviesList2: MoviesList2,
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
               <Route exact path="/Home" component={Home}/> 
               <Route path="/MoviesList2" render={(props) => <MoviesList2 {...props} setMsgBar={setMsgBar} userAccessRights={userAccessRights} isLogin={isLogin} />} />  
               <Route path="/MovieEdit/:id" render={(props) => <MovieEdit {...props} setMsgBar={setMsgBar} />} /> 
               <Route path="/MovieAdd" render={(props) => <MovieAddForm {...props} setMsgBar={setMsgBar} />} />
               <Route path="/MovieDelete/:id" render={(props) => <MovieDelete {...props} setMsgBar={setMsgBar} />} />
               <Route path="/EmployeeList" render={(props) => <EmployeeList {...props} setMovieAddMsgBar={setMsgBar} />} />
               <Route path="/UsersAccessList" render={(props) => <UsersAccessList {...props} setMovieAddMsgBar={setMsgBar} />} />
               <Route path="/ProjectList" render={(props) => <ProjectList {...props} setMsgBar={setMsgBar} userAccessRights={userAccessRights} isLogin={isLogin} />} />
               <Route path="/ProjectEditTabs/:id" render={(props) => <ProjectEditTabs {...props} setMsgBar={setMsgBar} userAccessRights={userAccessRights} isLogin={isLogin} />} /> 
              {/*<Route path="/MovieEdit/:id" component={MovieEdit}/> */}
              {/* <Route path="/MovieEdit/:id" render={(props) => <MovieEdit {...props} setMovieEditMsgBar={setMsgBar} />} /> */}
              {/* <Route path="/MovieAdd" render={(props) => <MovieAddForm {...props} setMovieAddMsgBar={setMsgBar} />} />
              {/*<Route path="/EmployeeList" render={(props) => <EmployeeList {...props} setMovieAddMsgBar={setMsgBar} />} />
              <Route path="/UsersAccessList" render={(props) => <UsersAccessList {...props} setMovieAddMsgBar={setMsgBar} />} /> */}
              {/* <AppliedRoute path="/MoviesList2"    component={MoviesList2} appProps={{setMsgBar, userAccessRights}} />    */}
            </div>
          </HashRouter>
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  )
}

export default VerticalSideBarMenu;