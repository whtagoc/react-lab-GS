import PropTypes from 'prop-types'
import React,   {useState, useEffect, useReducer} from 'react'
import {
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar
} from 'semantic-ui-react'

import {
	Route,
	Link,
	HashRouter
  } from "react-router-dom";

import HorizontalTopBarMenu from "./HorizontalTopBarMenu"  
import Home from "./Home";
import MoviesList2 from "./MoviesList2";
import MovieEdit from "./MovieEdit";

const VerticalSidebar = ({ animation, direction, visible }) => (
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
    
    <Menu.Item name="Home" as={Link} to="Home">
      Home
    </Menu.Item>
    <Menu.Item name="Movies" as={Link} to="MoviesList2">
      Movies
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='gamepad' />
      Games
    </Menu.Item>
    <Menu.Item as='a'>
      <Icon name='camera' />
      Channels
    </Menu.Item>
  </Sidebar>
  
  </HashRouter>
)

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}


const InitMsgBarVar = {
  msgText : "Initial Message",
  visibleMsgBar: false,
  counter : 0
  
};


const Main = () => {    
  const [animation, setAnimation] = useState('overlay');
  const [direction, setDirection] = useState('left');
  const [dimmed, setDimmed] = useState(false);
  const [visibleVerticalBar, setVisibleVerticalBar] = useState(false);

  const [mainMsgBar, setMainMsgBar] = useReducer((state, newState) => ({ ...state, ...newState }), InitMsgBarVar)
  
  const handleAnimationChange = (animation) => () => {
    //this.setState((prevState) => ({ animation, visible: !prevState.visible }))
    setAnimation(animation);
    if (visibleVerticalBar) {
      setVisibleVerticalBar(false)
    }else {
      setVisibleVerticalBar(true)
    }
  }

    return (
      <div>
     
        <HorizontalTopBarMenu 
          handleClickMenu={handleAnimationChange('push')} 
          SideBarVisible={visibleVerticalBar} 
          hTBMMsgBar ={mainMsgBar}
          setHTBMMsgBar = {setMainMsgBar}
        />
      
        <Sidebar.Pushable  as={Segment} style={{marginTop:0}}>
          
            <VerticalSidebar
              animation={animation}
              direction={direction}
              visible={visibleVerticalBar}
            />
          

          <Sidebar.Pusher >
            <Segment basic  style={{overflow: 'auto', maxHeight: '90vh', minHeight: '90vh',marginTop:0 }}>
              <HashRouter>
              <div>
              <Route exact path="/Home" component={Home}/>
              {/*<Route path="/MoviesList2" component={MoviesList2} parmtemp='testing123'/> */}
              <Route path="/MoviesList2" render={(props) => <MoviesList2 {...props} setMovieList2MsgBar={setMainMsgBar} />} />
		        	<Route path="/MovieEdit/:id" component={MovieEdit}/>
          	  </div>
            </HashRouter>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
}

export default Main;