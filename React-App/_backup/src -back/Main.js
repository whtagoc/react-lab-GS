import PropTypes from 'prop-types'
import React, { Component } from 'react'
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

const HorizontalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Segment}
    animation={animation}
    direction={direction}
    visible={visible}
  >
    <Grid textAlign='center'>
      <Grid.Row columns={1}>
        <Grid.Column>
          <Header as='h3'>New Content Awaits</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid columns={3} divided>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Grid.Column>
        <Grid.Column>
          <Image src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' />
        </Grid.Column>
      </Grid>
    </Grid>
  </Sidebar>
)

HorizontalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool,
}

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



export default class SidebarExampleTransitions extends Component {
  state = {
    animation: 'overlay',
    direction: 'left',
    dimmed: false,
    visible: false,
    //activeitem: undefined,
    windowHeight: undefined,
    windowWidth: undefined,
    visibleMsgBar : false
  };

  handleResize = () => this.setState({
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  });

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize)
    this.setState({ visibleMsgBar : false })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize)
    this.setState({ visibleMsgBar : false })
  }

 handleAnimationChange = (animation) => () => {
    this.setState((prevState) => ({ animation, visible: !prevState.visible }))
 }

  handleDimmedChange = (e, { checked }) => this.setState({ dimmed: checked })

  handleDirectionChange = (direction) => () =>
    this.setState({ direction, visible: false })

  render() {
    const { animation, dimmed, direction, visible } = this.state
    const vertical = direction === 'bottom' || direction === 'top'
   
    return (
      <div>
      {/*
        <Button onClick={this.handleAnimationChange('overlay')}>Overlay</Button>
        <Button onClick={this.handleAnimationChange('push')}>Push</Button>
        <Button onClick={this.handleAnimationChange('scale down')}>Scale Down</Button>
        {this.state.windowWidth} x {this.state.windowHeight}

        <HorizontalTopBarMenu handleClickMenu={this.handleAnimationChange('push')} SideBarVisible={this.state.visible} />
    */} 

        <HorizontalTopBarMenu 
          handleClickMenu={this.handleAnimationChange('push')} 
          SideBarVisible={this.state.visible} 
          visibleMsgBar ={this.visibleMsgBar}
        
        />
      
        <Sidebar.Pushable  as={Segment} style={{marginTop:0}}>
          {vertical ? (
            <HorizontalSidebar
              animation={animation}
              direction={direction}
              visible={visible}
            />
          ) : null}
          {vertical ? null : (
            <VerticalSidebar
              animation={animation}
              direction={direction}
              visible={visible}
            />
          )}

          <Sidebar.Pusher >
            <Segment basic  style={{overflow: 'auto', maxHeight: '90vh', minHeight: '90vh',marginTop:0 }}>
              <HashRouter>
              <div>
              <Route exact path="/Home" component={Home}/>
              {/*<Route path="/MoviesList2" component={MoviesList2} parmtemp='testing123'/> */}
              <Route path="/MoviesList2" render={(props) => <MoviesList2 {...props} visibleMsgBar={this.visibleMsgBar} />} />
		        	<Route path="/MovieEdit/:id" component={MovieEdit}/>
          	  </div>
            </HashRouter>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    )
  }
}