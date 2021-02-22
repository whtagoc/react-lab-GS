import React, {useState, useEffect  } from "react";
import axios from "axios";
import MoviesTableListSemUI from "./MoviesTableListSemUI";
import MoviesInputSearchSemUI from "./MoviesInputSearchSemUI"
import CustomLoader  from './CustomLoader'

const MoviesList2 = ( props	) => {
	const [searchString, setSearchString] = useState('');
	const [searchGenre, setSearchGenre] = useState('');
	const [movies, setMovies] = useState([]);
	const [inputSearch, setInputSearch] = useState({SelGenre:'', searchString:''});
	const [showLoader, setShowLoader] = useState(false)

	console.log("Start MoviesList2 (searchString) = " +  searchString);
	console.log(props.userAccessRight)

	useEffect(() => {
		console.log(props.userAccessRights)
		//var url = 'https://localhost:44367/api/movie'
		var url = 'https://localhost:5001/api/movie'

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
		
		setShowLoader(true)
		axios
		.get(url, {searchString : searchString })
		.then(
			
			movies => {
				setShowLoader(false)
				setMovies(movies.data)
			}
		)
		.catch( error => { 
			console.log("error.request = " + error.request)
			if (error.response) {
			  // The request was made and the server responded with a status code
			  // that falls out of the range of 2xx
			  console.log(error.response.data);
			  console.log(error.response.status);
			  console.log(error.response.headers);
			} else if (error.request) {
			  // The request was made but no response was received
			  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			  // http.ClientRequest in node.js
			  console.log(error.request);
			} else {
			  // Something happened in setting up the request that triggered an Error
			  console.log('Error', error.message);
			}
			console.log("error.config = " + error.config);
		});
		

	}, [searchString,searchGenre,props.setMsgBar]);	


	const handleChange = (e, { name, value }) => {
		setInputSearch({[name] : value})
	}
	
	const handleSubmit = event => {
		event.preventDefault();
		props.setMsgBar({visibleMsgBar:true, counter:0, msgText:"Succdessfully Submitted"});

		setSearchString (inputSearch.searchString);
		setSearchGenre (inputSearch.SelGenre);
		      
		console.log( ' handleSubmit MoviesList2 ==> searchString=' + searchString + " SearchGenre=" + searchGenre);	
		
	}
	
	
    return (	
		<div>
			<MoviesInputSearchSemUI SubmitHandler={handleSubmit} OnChangeHandler={handleChange} />
			<MoviesTableListSemUI movies={movies} setMsgBar={props.setMsgBar} userAccessRights={props.userAccessRights}/>
		    <CustomLoader active={showLoader} size={'small'}/>
		</div>
		
    );
}
 
export default MoviesList2;