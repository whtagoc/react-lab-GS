import React, {useState, useEffect } from 'react'
import {
  Icon,
  Menu,
  Segment,
  Sidebar,
  Dropdown,
  Button
} from 'semantic-ui-react'


import HorizontalTopBarMsgTimer from './HorizontalTopBarMsgTimer'
import VerticalSideBarMenu from './VerticalSideBarMenu'


const HorizontalTopBarMsg = ({ animation, direction, visible, handleShowHide, msgText, color }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon='labeled'
    inverted
    vertical
    visible={visible}
    width='thin'
    color={color}
  >
    
    <Menu color={color}   inverted borderless size={'large'} style={{borderRadius:0, marginBottom:0}}>   
      <Menu.Item >{msgText}</Menu.Item>
      <Menu.Menu position='right'>
      <Menu.Item
        name='Menu'
        onClick={handleShowHide}
      >
        <Icon name={'times circle outline'} />
      </Menu.Item> 
      </Menu.Menu>
    </Menu>
  </Sidebar>
)

const HorizontalTopBarMenu = props => {
  const [activeItem, setActiveItem] = useState('');
  const [iconMenu, setIconMenu] = useState('angle double right');
  const [animation, setAnimation] = useState('overlay');
  const [direction, setDirection] = useState('top');
  const [visibleVerticalBarMenu, setVisibleVerticalBarMenu] = useState(false);
  const [msgTimerOn, setMsgTimerOn] = useState(false);
  

  useEffect(() => {	
    console.log("props.userAccessRightsHTBM")
    console.log(props.userAccessRightsHTBM)
    console.log(props.VSBMMsgBar)
  }, [props.userAccessRightsHTBM],)

  useEffect(() => {	
    if (props.hTBMMsgBar.visibleMsgBar) {
      setMsgTimerOn(true)
    } else {
      setMsgTimerOn(false)
    }  
  }, [props.hTBMMsgBar])

  const handleItemClick = (e, { name }) => {
    setActiveItem({ name });
    
    if (visibleVerticalBarMenu) {
      setVisibleVerticalBarMenu(false)
      setIconMenu("angle double right")
    }
    else {
      setVisibleVerticalBarMenu(true)
      setIconMenu("angle double left")
    }
  }
 
  const handleShowHideTopBarMsg = (e, {name}) =>  {
    if (props.hTBMMsgBar.visibleMsgBar) {
      props.setHTBMMsgBar({visibleMsgBar : false, msgText : "", counter : 0})
    } else {
      props.setHTBMMsgBar({visibleMsgBar : true, msgText : "You Click the arrow down", counter : 0})
    }  
  }

  const handleLogOut = (event) => {
    props.setIsLogin(false)
  }
  
  
  return (
    <Sidebar.Pushable  style={{marginTop:0,marginBottom:0}}>
        {(<HorizontalTopBarMsg
            animation={animation}
            direction={direction}
            visible={props.hTBMMsgBar.visibleMsgBar}
            handleShowHide={handleShowHideTopBarMsg}
            msgText={props.hTBMMsgBar.msgText}
            color={props.hTBMMsgBar.colorMsgBar}
        />)}

      <HorizontalTopBarMsgTimer timerOn={msgTimerOn} setTimerOn={setMsgTimerOn} 
        msgBarTimer={props.hTBMMsgBar}
        setMsgBarTimer={props.setHTBMMsgBar}  />

      {/* <Sidebar.Pusher > */}
        <Menu color={'blue'} inverted borderless size={'large'} style={{borderRadius:0,marginTop:0, marginBottom:0,height:'10vh'}}>   
          <Menu.Item
            name='Menu'
            active={activeItem === 'Menu'}
            onClick={handleItemClick}
          >
            <Icon name={iconMenu} />
          </Menu.Item>

          <Menu.Item
            name='Menu'
            active={activeItem === 'Menu'}
            onClick={handleShowHideTopBarMsg}
          >
            <Icon name={"arrow down"} />
          </Menu.Item>

          <Menu.Item position='right'>
            <Dropdown text={props.userSession.username} pointing className='link item'>
              <Dropdown.Menu>
                <Dropdown.Item>Profile</Dropdown.Item>
                <Dropdown.Item>Help</Dropdown.Item>
                <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
          
        </Menu>
      {/* </Sidebar.Pusher>   */}
    
      <VerticalSideBarMenu  
        visibleVerticalBarMenu={visibleVerticalBarMenu} 
        setVisibleVerticalBarMenu={setVisibleVerticalBarMenu} 
        setIsLogin = {props.setIsLogin}
           isLogin = {props.isLogin}
        userAccessRightsVSBM = {props.userAccessRightsHTBM} 
        setVSBMMsgBar = {props.setHTBMMsgBar}
        VSBMMsgBar = {props.hTBMMsgBar}
      /> 
    </Sidebar.Pushable>
  )
};

export default HorizontalTopBarMenu