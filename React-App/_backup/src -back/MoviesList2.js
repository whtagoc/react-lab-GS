import React, {useState, useEffect  } from "react";
import axios from "axios";
import MoviesTableListSemUI from "./MoviesTableListSemUI";
import MoviesInputSearchSemUI from "./MoviesInputSearchSemUI"

import HorizontalTopBarMenu from "./HorizontalTopBarMenu"  



const MoviesList2 = (props) => {
	const [searchString, setSearchString] = useState('');
	const [searchGenre, setSearchGenre] = useState('');
	const [movies, setMovies] = useState([]);

	const [inputSearch, setInputSearch] = useState({SelGenre:'', searchString:''});

	console.log("Start MoviesList2 (searchString) = " +  searchString);
	
	useEffect(() => {
		alert(props.visibleMsgBar)
		var url = 'https://localhost:44367/api/movie'
		var parm = ""
		
		console.log( ' useEffect MoviesList2 ==> searchString=' + searchString + " SearchGenre=" + searchGenre);	
		
		if (searchString) {
			parm = parm + "?searchString=" + searchString		
		}
		
		if (searchGenre) {
			if (parm) {
				parm = parm + "&movieGenre=" + searchGenre	 	
			}
			else {
				parm = parm + "?movieGenre=" + searchGenre	
			}
			
		}
		
		if (parm) {
			url = url + parm
		}
		
		axios
		.get(url, {searchString : searchString })
		.then(movies => setMovies(movies.data));
		
	

	}, [searchString,searchGenre]);




	const handleChange = (e, { name, value }) => {
		setInputSearch({[name] : value})
	}
	
	const handleSubmit = event => {
		event.preventDefault();
		setSearchString (inputSearch.searchString);
		setSearchGenre (inputSearch.SelGenre);
		console.log( ' handleSubmit MoviesList2 ==> searchString=' + searchString + " SearchGenre=" + searchGenre);	
		
	}
	
	
    return (	
		<div>
			<MoviesInputSearchSemUI SubmitHandler={handleSubmit} OnChangeHandler={handleChange} />
			<MoviesTableListSemUI movies={movies}  />
		</div>
		
    );
}
 
export default MoviesList2;