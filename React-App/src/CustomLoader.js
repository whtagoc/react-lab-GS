import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const CustomLoader = (props) => {

	return (
  		<div>
      		<Dimmer active={props.active} inverted >
        		<Loader size={props.size}>Loading</Loader>
      		</Dimmer>
  		</div>
	)
}

export default CustomLoader;



 