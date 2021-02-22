import React from 'react'
import { Link } from 'react-router-dom'


//interface Iprops {
//  movies : [],	
//  fn : () => void,
//  searchInput: string
//}

//const MoviesListView2 = ({ movies}) => {
//const MoviesListView2 = ({movies, fn, searchInput}) => {
const MoviesListView2 = props => {	

  return (
	<div>
		<center><table className="table">
			<thead>
			<tr>
				<th>
					Id
				</th>
				<th>
					Title
				</th>
				<th>
					Release Date
				</th>
				<th>
					Genre
				</th>
				<th>
					Price
				</th>
				<th>
					Ratings
				</th>
				<th></th>
			</tr>
			</thead>
			<tbody>
			{props.movies.map((movie) => (
			<tr key={movie.id}>
				<td>
					{movie.id }
				</td>
				<td>
					{movie.title}
				</td>
				<td>
					{movie.releaseDate}
				</td>
				<td>
					{movie.genre}
				</td>
				<td>
					{movie.price}
				</td>
				<td>
					{movie.rating}
				</td>
				<td>
					
					{/*<Link to='/MovieEdit/2'>Edit</Link>*
					
					<Link to={{
						pathname: `/MovieEdit/${movie.id}`,
						   state: {
									fromNotifications: true
								  },
						  search: "12345",
							hash: "fasdfdsfadsf"
						}}>Tyler McGinnis</Link>
					*/}
						
					<Link to={`/MovieEdit/${movie.id}`}>Edit</Link>&nbsp;&nbsp;
					<Link to={`/MovieDelete/${movie.id}`}>Delete</Link>
				
				</td>
			</tr>	
			))}
			</tbody>
		</table></center>
		<Link to={'/MovieAdd'}>Add New Movie</Link>
	</div>
  )
};

export default MoviesListView2