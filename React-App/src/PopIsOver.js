import React from 'react'
import { Button, Popup } from 'semantic-ui-react'

const PopIsOver = props => (
  <Popup
    content='I will not flip!'
    on='click'
    pinned
    trigger={<Button content='Button' />}
    position='right center' 
  >
     <props.mycomponent />
  </Popup>
)

export default PopIsOver