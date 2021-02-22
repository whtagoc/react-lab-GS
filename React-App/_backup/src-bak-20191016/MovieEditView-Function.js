import React from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

    const MovieEditView = ({ movies }) => {
	
	{/*
	SubmitHandler = (event) => {
    event.preventDefault();
		alert("You are submitting " );
	}
	*/}
		
      return (
        <div>
			<center><h1>Movie Edit</h1></center>
			<form>
			<table>
				<tbody>
					<tr>
						<td>
							Id
						</td>
						<td>
							<input type="text" value={movies.id} disabled="true"/>
						</td>
					</tr>
					<tr>
						<td>
							Title
						</td>
						<td>
							<input type="text" value={movies.title}/>
						</td>
					</tr>
					<tr>
						<td>
							Release Date
						</td>
						<td>
							<input type="text" value={movies.releaseDate}/>
						</td>
					</tr>
					<tr>
						<td>
							Genre
						</td>
						<td>
							<input type="text" value={movies.genre}/>
						</td>
					</tr>
					<tr>
						<td>
							Price
						</td>
						<td>
							<input type="text" value={movies.price}/>
						</td>
					</tr>
					<tr>
						<td>
							Rating
						</td>
						<td>
							<input type="text" value={movies.rating}/>
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
    };

    export default MovieEditView