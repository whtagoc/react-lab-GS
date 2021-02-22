import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'


class MovieEditForm extends Component {		
	constructor(props) {
		super(props);
		
		this.state = { movie : this.props.movies,
			         id : "",
				  title : "",
			releaseDate : "",
			      genre : "",
				 rating : "",
				 price  : 0,
			updatesuccess : false
		};
		
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);	
		this.handleReset  = this.handleReset.bind(this);
	}
	
	handleChange(event) {
		this.setState({[event.target.name] : event.target.value});	
	}
	
	handleReset(event) {
		this.setState({id : this.state.movie.id});
		this.setState({title : this.state.movie.title});
		this.setState({releaseDate : this.state.movie.releaseDate});
		this.setState({genre : this.state.movie.genre});
		this.setState({price : this.state.movie.price});
		this.setState({rating : this.state.movie.rating});
	}
	
	
	handleSubmit(event) {
		event.preventDefault();
	
		const data = { 
					 id : this.state.id,
				  title : this.state.title,
			releaseDate : this.state.releaseDate,
			      genre : this.state.genre,
				 price  : this.state.price,
				 rating : this.state.rating
		};
		
		fetch('https://localhost:44367/api/movie/' + data.id, {
			credentials: 'same-origin',
			crossDomain:true,
			mode : 'cors',
			headers: new Headers({'Content-Type': 'application/json'}),
			method: 'PUT',
			body: JSON.stringify(data)	
		})
        .then((response) => {
			if (response.ok) {
				alert("Movie was successfully updated.")
				this.setState({updatesuccess : true})
			}	
			else {
				alert("Error while updating movie info.");
			}
			
			
			
        })
        .catch(console.log);
	}
	
	
	componentDidMount() {
		this.setState({movie: this.props.movies});	
	}
	
	UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps.movies !== this.props.movies){
            this.setState({movie:nextProps.movies});
			this.setState({id : nextProps.movies.id});
			this.setState({title : nextProps.movies.title});
			this.setState({releaseDate : nextProps.movies.releaseDate});
			this.setState({genre : nextProps.movies.genre});
			this.setState({price : nextProps.movies.price});
			this.setState({rating : nextProps.movies.rating});
        }
	}
	
	
	render() {	
	
	  if (this.state.updatesuccess === true) {
		return (<Redirect to='/MoviesList' />)
      }

      return (
	  
        <div>
			<center><h1>Movie Edit</h1></center>
			<center>
			<form onSubmit={this.handleSubmit}>
			<table id="tFreeForm"> 	
					<tbody>
						<tr>
							<td>
								Id
							</td>
						</tr>
						<tr>
							<td>
								<input type="text" id="id" name="id" value={this.state.id } disabled="disabled"
								onChange={(event)=>this.handleChange(event)}
								/>
							</td>
						</tr>
						<tr>
							<td>
								Title
							</td>
						</tr>
						<tr>						
							<td>
								<input type="text" id="title" name="title" value={this.state.title}
								onChange={(event)=>this.handleChange(event)}/>
							</td>
						</tr>
						<tr>
							<td>
								Release Date
							</td>
						</tr>
						<tr>
							<td>
								<input type="text" id="releaseDate" name="releaseDate" value={this.state.releaseDate}
								onChange={(event)=>this.handleChange(event)}/>
							</td>
						</tr>
						<tr>
							<td>
								Genre
							</td>
						</tr>
						<tr>
							<td>
								<input type="text" id="genre" name="genre" value={this.state.genre}
								onChange={(event)=>this.handleChange(event)}/>
							</td>
						</tr>
						<tr>
							<td>
								Price
							</td>
						</tr>
						<tr>
							<td>
								<input type="text" id="price" name="price" value={this.state.price || 0}
								onChange={(event)=>this.handleChange(event)}/>
							</td>
						</tr>
						<tr>
							<td>
								Rating
							</td>
						</tr>	
						<tr>
							<td>
								<input type="text" id="rating" name="rating" value={this.state.rating || ""}
								onChange={(event)=>this.handleChange(event)}/>
							</td>
						</tr>
						<tr>
							<td>
							</td>
						</tr>
						<tr>
							<td>
								 <button>Update</button>
								 <button type="button" onClick={(event)=>this.handleReset(event)}>Reset</button>
							</td>
						</tr>
					</tbody>
				</table>
				</form>
				</center>
			<Link to={'/MoviesList'}>Back to Movies List</Link>
        </div>
      )
	}
};

export default MovieEditForm