import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'


class MovieAddForm extends Component {		
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
		this.setState({id : ""});
		this.setState({title : ""});
		this.setState({releaseDate : ""});
		this.setState({genre : ""});
		this.setState({price : ""});
		this.setState({rating : ""});
	}
	
	
	handleSubmit(event) {
		event.preventDefault();
	
		const data = { 
				  title : this.state.title,
			releaseDate : this.state.releaseDate,
			      genre : this.state.genre,
				 price  : this.state.price,
				 rating : this.state.rating
		};
		
		fetch('https://localhost:44367/api/movie', {
			credentials: 'same-origin',
			crossDomain:true,
			mode : 'cors',
			headers: new Headers({'Content-Type': 'application/json'}),
			method: 'POST',
			body: JSON.stringify(data)	
		})
        .then((response) => {
			console.log(JSON.stringify(data))
			console.log(response)
			if (response.ok) {
				alert("Movie was successfully saved.")
				this.setState({updatesuccess : true})
			}	
			else {
				alert("Error while saving movie info.");
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
			<center><h1>Movie Add</h1></center>
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
								 <button>Save</button>
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

export default MovieAddForm