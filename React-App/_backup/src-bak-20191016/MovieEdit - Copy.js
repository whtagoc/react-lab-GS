import React, { Component } from "react";
import MovieEditForm from "./MovieEditForm";

class MovieEdit extends Component {

	constructor(props) {
		super(props);
		
		this.state = {
			movies: []
		}	
	};
	
	
	componentDidMount() {
		var id  = this.props.match.params.id;
		
        fetch('https://localhost:44367/api/movie/' + id)
        .then(res => res.json())
        .then((data) => {
          this.setState({ movies: data })
        })
        .catch(console.log)
    }	


	
	render() {
		return (
		<div>
			<MovieEditForm movies={this.state.movies} />
		</div>
    );
  }
}
 
export default MovieEdit;


 