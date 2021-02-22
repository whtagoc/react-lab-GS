import PropTypes from 'prop-types'
import React, {useState } from 'react'
import HorizontalTopBarMsgTimer from 'HorizontalTopBarMsgTimer'

import {
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar
} from 'semantic-ui-react'

const HorizontalTopBarMsg = props => {
  const [activeItem, setActiveItem] = useState('');
  const [iconMenu, setIconMenu] = useState('angle double right');

  const handleItemClick = (e, { name }) => {
    setActiveItem({ name });
    props.handleClickMenu('push');
   
    if (props.SideBarVisible) {
      setIconMenu("angle double right")
    } 
    else {
      setIconMenu("angle double left")
    }
   // props.handleClickMenu('top');
  }

  HorizontalTopBarMsg.propTypes = {
    animation: PropTypes.string,
    direction: PropTypes.string,
    visible: PropTypes.bool,
  }

  const HorizontalBarMsg = ({ animation, direction, visible }) => (
    <Sidebar
      as={Menu}
      animation={animation}
      direction={direction}
      icon='labeled'
      inverted
      visible={visible}
      width='thin'
    >
      
      <Menu color={'green'} inverted borderless size={'large'} style={{borderRadius:0, marginBottom:0,}}>    
      </Menu>
    </Sidebar>
  )


    return (
      <div>
       

        <Sidebar.Pushable >
          
          <HorizontalBarMsg
            animation={'overlay'}
            direction={'top'}
            visible={true}
          />
          
          <Sidebar.Pusher >
            <Segment basic  style={{maxHeight: '2vh', minHeight: '2vh',marginTop:0 }}>
             
              <div>
              
          	  </div>
           
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
};

  export default HorizontalTopBarMsg