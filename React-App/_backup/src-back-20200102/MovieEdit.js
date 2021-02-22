import React, {useState, useEffect  } from "react";
import axios from "axios";
import MovieEditForm from "./MovieEditForm";


const MovieEdit = props => {	
    const [movie, setMovie] = useState([]);	

	useEffect(() => {
		var id  = props.match.params.id;
		
		//var url = 'https://localhost:44367/api/movie/' + id
		var url = 'https://localhost:5001/api/movie/' + id

		axios
		.get(url)
		.then(movie => setMovie(movie.data));

	}, [props.match.params.id]);


	return (
		<div>
			<MovieEditForm movies={movie} setMsgBar= {props.setMsgBar}/>
		</div>
    );
  
}
 
export default MovieEdit;


 