import React, {useState } from 'react'
import { Menu, Icon } from 'semantic-ui-react'

const HorizontalTopBarMenu = props => {
  const [activeItem, setActiveItem] = useState('');
  const [iconMenu, setIconMenu] = useState('angle double right');

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

  


    return (
      <Menu color={'blue'} inverted borderless size={'large'} style={{borderRadius:0, marginBottom:0,height:'8vh'}}>   
        <Menu.Item
          name='Menu'
          active={activeItem === 'Menu'}
          onClick={handleItemClick}
        >
          <Icon name={iconMenu} />
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
    )
};

  export default HorizontalTopBarMenu