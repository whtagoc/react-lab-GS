import React, { Component } from "react";
import MoviesListView from "./MoviesListView";
 
class MoviesList extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			movies: [],
			input: '',
			searchString: ''
			
		}
		
		this.handleSubmit = this.handleSubmit.bind(this);
	};
	

	componentDidMount() {
		
		console.log("componentDidMoun = " );
        fetch('https://localhost:44367/api/movie')
        .then(res => res.json())
        .then((data) => {
          this.setState({ movies: data })
        })
        .catch(console.log)
		
		this.handleSubmit = this.handleSubmit.bind(this);
		console.log(this.state.handleSubmit);
     }	 
	 
	 handleSubmit2 = e => {
			e.preventDefault();
			
			alert('running!')
			//this.setState({
			//	searchString: e.target.value
			//})
			
			
	 }
	 
	 handleSubmit(event) {
		event.preventDefault();
	
		alert("MovieList handleSubmit");
		
	 }
	 
	render() {
		console.log('MovieList');
		console.log("Movielist ==>" + this.state.movies.length);
		console.log(this.state.handleSubmit);
		return (
		
		<div>
			<MoviesListView test='data' movies={this.state.movies} search={this.state.searchString} handleSubmit={this.state.handleSubmit} />
		</div>
    );
  }
}
 
export default MoviesList;