import React, {useState, useEffect } from 'react'
import {
  Icon,
  Menu,
  Segment,
  Sidebar
} from 'semantic-ui-react'
import { isAbsolute } from 'path';

import HorizontalTopBarMsgTimer from './HorizontalTopBarMsgTimer'


const HorizontalTopBarMsg = ({ animation, direction, visible, handleShowHide, msgText }) => (
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
    
    <Menu color={'green'}   inverted borderless size={'large'} style={{borderRadius:0, marginBottom:0}}>   
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
  //const [visibleMsgBar, setVisibleMsgBar] = useState(props.hTBMMsgBar.visibleMsgBar);
  

  const [timerOn, setTimerOn] = useState(false);

  const handleItemClick = (e, { name }) => {
    setActiveItem({ name });
    props.handleClickMenu('top');
   
    if (props.SideBarVisible) {
      setIconMenu("angle double right")
    } 
    else {
      setIconMenu("angle double left")
    }
   
  }

  useEffect(() => {
	  if (props.hTBMMsgBar.visibleMsgBar) {
      setTimerOn (true)
    } else {
      setTimerOn (false)
    }
	}, [props.hTBMMsgBar.visibleMsgBar]);
   
  const handleShowHideTopBarMsg = (e, {name}) =>  {
    if (props.hTBMMsgBar.visibleMsgBar) {
      props.setHTBMMsgBar({visibleMsgBar : false, msgText : ""})
    } else {
      props.setHTBMMsgBar({visibleMsgBar : true, msgText : "Your Click the arrow down"})
    }  
  }


  return (
    
    <Sidebar.Pushable  as={Segment} style={{marginTop:0,marginBottom:0}}>
        {(<HorizontalTopBarMsg
            animation={animation}
            direction={direction}
            visible={props.hTBMMsgBar.visibleMsgBar}
            handleShowHide={handleShowHideTopBarMsg}
            msgText={props.hTBMMsgBar.msgText}
        />)}

      <HorizontalTopBarMsgTimer timerOn={timerOn} setTimerOn={setTimerOn} 
        msgBarTimer={props.hTBMMsgBar}
        setMsgBarTimer={props.setHTBMMsgBar}  />

      <Sidebar.Pusher >
        <Menu color={'blue'} inverted borderless size={'large'} style={{borderRadius:0, marginBottom:0,height:'8vh'}}>   
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

          <Menu.Menu position='right'>
            <Menu.Item
              name='signup'
              active={activeItem === 'signup'}
              //onClick={this.handleItemClick}
            >
              Sign Up
            </Menu.Item>

            <Menu.Item
              name='help'
              active={activeItem === 'help'}
            //    onClick={this.handleItemClick}
            >
              Help
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
};

export default HorizontalTopBarMenu