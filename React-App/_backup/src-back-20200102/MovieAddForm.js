import React, { useState, useReducer } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Form, Input,  Button } from 'semantic-ui-react'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";

const InitFormValue = {   
		  	 id: "",
 	      title: "",
	releaseDate: "",
          genre: "",
         rating: "",
          price: ""
};

const InitFormError = {   
	idError: false,
 titleError: false,
releaseDateError: false,
genreError: false,
ratingError: false,
priceError: false
};


const MovieAddForm = props => {	
	const [formInputValue, setFormInputValue] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [formInputError, setFormInputError] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormError);
	const [updatesuccess, setUpdatesuccess] = useState(false);
	const [movieID, setMovieID] = useState(null);

																
	const handleChange = (e, { name, value }) => {
		setFormInputValue({[name] : value})
	}
	
	const handleReset = (event) => {
		setFormInputValue(InitFormValue)
	}
	
	
	const handleSubmit = (event)  => {
		event.preventDefault();
	
		const data = { 
				  title : formInputValue.title,
			releaseDate : formInputValue.releaseDate,
			      genre : formInputValue.genre,
				 price  : formInputValue.price,
				 rating : formInputValue.rating
		};
		
	/*
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
				//alert("Movie was successfully updated.")
				props.setMovieEditFormMsgBar ({msgText : "Movie was successfully updated.", visibleMsgBar: true, counter : 0})
				setUpdatesuccess(true);
			}	
			else {
				//alert("Error while updating movie info.");
				props.setMovieEditFormMsgBar ({msgText : "Error while updating movie info.", visibleMsgBar: true, counter : 0})

			}

        })
		.catch(console.log);
	*/

		let error = false;

		if (formInputValue.title === '') {
			setFormInputError({titleError: { content: 'Please enter Title', pointing: 'below' }})
			error = true
		} else {
			setFormInputError({titleError : false})
			error = false
		}

		if (formInputValue.releaseDate === '') {
			setFormInputError({releaseDateError: { content: 'Please enter Release Date', pointing: 'below' }})
			error = true
		} else {
			setFormInputError({releaseDateError: false})
			error = false
		}

		if (formInputValue.genre === '') {
			setFormInputError({genreError: { content: 'Please enter Genre', pointing: 'below' }})
			error = true
		} else {
			setFormInputError({genreError: false})
			error = false
		}

		if (formInputValue.price === '') {
			setFormInputError({priceError: { content: 'Please enter Price', pointing: 'below' }})
			error = true
		} else {
			setFormInputError({priceError: false})
			error = false
		}

		if (formInputValue.rating === '') {
			setFormInputError({ratingError: { content: 'Please enter Rating', pointing: 'below' }})
			error = true
		} else {
			setFormInputError({ratingError: false})
			error = false
		}

		if (error) {
			return
		}

		//var url = 'https://localhost:44367/api/movie/' 
		var url = 'https://localhost:5001/api/movie/' 
	
		axios.post(url, data, {
		headers: {
			'Content-Type': 'application/json'
			}	
		})
		.then(response => { 
			console.log("sucess")
			console.log(response.data.id)
			setMovieID(response.data.id)
			console.log(response)
			props.setMsgBar ({msgText : "Movie was successfully save.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
			setUpdatesuccess(true) 
		})
		.catch(error => {
			console.log(error.response)
			props.setMsgBar ({msgText : "Error while saving movie info.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
			setUpdatesuccess(false) 
		});
	}
	
	
	if (updatesuccess === true) {
		var redi = '/MovieEdit/' +  movieID; 
		return (<Redirect to={redi} />)
	}
	
	const handleFormateDate = (date) => {
		if (date === null) {
			setFormInputValue({releaseDate : date})		
		}
		else {
			var dd = date.getDate();
			var mm = date.getMonth(mm);
			var yyyy = date.getFullYear();
			var selectedDate = yyyy + "-" + mm + "-" + dd ;
			setFormInputValue({releaseDate : selectedDate})	
		}

	}

	return (
	
	<div>
		<center>Movie New</center>
	
		<Form onSubmit={handleSubmit}>
			Id
			<Form.Field 
				id='id'
				name='id'
				control={Input}
				style={{width:'450px'}}
				value={formInputValue.id || ''}
				disabled

			/>
			<Form.Field 
				id='title'
				name='title'
				control={Input}
				label='Title'
				style={{width:'450px'}}
				value={formInputValue.title || ''}
				onChange={handleChange}
				error={formInputError.titleError}
				fluid
			/>
			<Form.Field 
				id='releaseDate'
				name='releaseDate'
				control={DatePicker}
				label='Release Date'
				style={{width:'450px'}}
				//value={formInputValue.releaseDate || ''}
				//onChange={handleChange}
				error={formInputError.releaseDateError}
				onChange={date => handleFormateDate(date)} 
				selected={Date.parse(formInputValue.releaseDate) || ''} 
				dateFormat="yyyy/MM/dd"
			/>  
				

			<Form.Field 
				id='genre'
				name='genre'
				control={Input}
				label='Genre'
				style={{width:'450px'}}
				value={formInputValue.genre || ''}
				onChange={handleChange}
				error={formInputError.genreError}
				fluid
				
			/>  
			<Form.Field 
				id='price'
				name='price'
				control={Input}
				label='Price'
				style={{width:'450px'}}
				value={formInputValue.price || 0}
				onChange={handleChange}
				error={formInputError.priceError}
				fluid

			/>  
				<Form.Field 
				id='rating'
				name='rating'
				control={Input}
				label='Rating'
				style={{width:'450px'}}
				value={formInputValue.rating || ''}
				onChange={handleChange}
				error={formInputError.ratingError}
				fluid
			/>  
		<Button type='submit'>Save</Button>	 <Button type='Reset' onClick={handleReset}>Reset</Button>	
		</Form>
	    <div><br></br></div>
		<Link to={'/MoviesList2'}>Back to Movies List</Link>
	</div>
	)
	
};

export default MovieAddForm