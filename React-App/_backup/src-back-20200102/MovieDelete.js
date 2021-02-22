import React, { useState, useEffect, useReducer } from 'react'
import { Redirect } from 'react-router-dom'
import axios from "axios";

const MovieDelete = props => {	

	
	useEffect(() => {	

		var id  = props.match.params.id;
		
		var url = 'https://localhost:5001/api/movie/' + id
		
		
		axios.delete(url, {
        headers: {
            'Content-Type': 'application/json'
        	}	
		})
		.then(response => { 
			console.log(response)
			props.setMsgBar ({msgText : "Movie was successfully Deleted.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
		})
		.catch(error => {
			console.log(error.response)
			props.setMsgBar ({msgText : "Error while Deleting movie.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
		});		
	
	}, [props.match.params.id])
	
		
		
	return (
		<Redirect to='/MoviesList2' />
    );
  
}
 
export default MovieDelete;