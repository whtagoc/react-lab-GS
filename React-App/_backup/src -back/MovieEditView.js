import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

   
class MovieEditView extends Component {		
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		fetch('https://localhost:44367/api/movie/' + this.props.movies.id, {
		method: 'POST',
		body: data,
		});
	}
	
	render() {	
      return (
        <div>
			<center><h1>Movie Edit</h1></center>
			<form onSubmit={this.handleSubmit}>
				<table>
					<tbody>
						<tr>
							<td>
								Id
							</td>
							<td>
								<input type="text" id="id" name="id" value={this.props.movies.id}/>
							</td>
						</tr>
						<tr>
							<td>
								Title
							</td>
							<td>
								<input type="text" id="title" name="title" value={this.props.movies.title}/>
							</td>
						</tr>
						<tr>
							<td>
								Release Date
							</td>
							<td>
								<input type="text" id="releaseDate" name="releaseDate" value={this.props.movies.releaseDate}/>
							</td>
						</tr>
						<tr>
							<td>
								Genre
							</td>
							<td>
								<input type="text" id="genre" name="genre" value={this.props.movies.genre}/>
							</td>
						</tr>
						<tr>
							<td>
								Price
							</td>
							<td>
								<input type="text" id="price" name="price" value={this.props.movies.price}/>
							</td>
						</tr>
						<tr>
							<td>
								Rating
							</td>
							<td>
								<input type="text" value={this.props.movies.rating}/>
							</td>
						</tr>
						<tr>
							<td>
							</td>
							<td>
								 <input type='submit'/>
								 <button>Update</button>
							</td>
						</tr>
					</tbody>
				</table>
				</form>
			<Link to={'/MoviesList'}>Back to Movies List</Link>
        </div>
      )
	}
};

export default MovieEditView