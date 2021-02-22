import React, { Component } from "react";
import { Redirect } from 'react-router-dom'


class MovieDelete extends Component {

	constructor(props) {
		super(props);
		this.state = {
			deletesuccess : false
		}
	};
	
	
	
	componentDidMount() {
		var id  = this.props.match.params.id;
		 
		
        fetch('https://localhost:44367/api/movie/' + id, {
			credentials: 'same-origin',
			crossDomain:true,
			mode : 'cors',
			headers: new Headers({'Content-Type': 'application/json'}),
			method: 'DELETE'
		})
        .then((response) => {
			if (response.ok) {
				alert("Movie was successfully deleted.")
				console.log("Movie was successfully deleted.");
			}	
			else {
				alert("Error while deleting movie.");
			}
        })
        .catch(console.log);
    }	
	
	
	render() {
		alert("Render Delete")
		console.log("Render Delete")
		return (
		<Redirect to='/MoviesList' />
    );
  }
}
 
export default MovieDelete;


 