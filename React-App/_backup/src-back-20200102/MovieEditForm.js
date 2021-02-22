import React, { useState, useEffect, useReducer } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Form, Input,  Button} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';


const InitFormValue = {   
		   id: "",
		title: "",
  releaseDate: "",
		genre: "",
	   rating: "",
	    price: ""
};


//setstate({
//	...state,
//	{
//		title: InitFormValue.title,
//		genre: In,
//	}
//})


const MovieEditForm = props => {	
	const [movies, setMovies] = useState(props.movies);
	const [formInputValue, setFormInputValue] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue)
	


	useEffect(() => {	

		setMovies(props.movies);
		//setFormInputValue(props.movies)
		setFormInputValue(movies)

	}, [props.movies, movies])

																
	const handleChange = (e, { name, value }) => {

		setFormInputValue({[name] : value})

	}
	
	const handleReset = (event) => {
		setFormInputValue(props.movies)
	}
	
	
	const handleSubmit = (event)  => {
		event.preventDefault();
	
		const data = { 
				     Id : formInputValue.id,
				  Title : formInputValue.title,
			ReleaseDate : formInputValue.releaseDate,
			      Genre : formInputValue.genre,
				 Price  : formInputValue.price,
				 Rating : formInputValue.rating
		};

		
		
/*	Working
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
				props.setMsgBar ({msgText : "Movie was successfully updated.", visibleMsgBar: true, counter : 0})
				setUpdatesuccess(true);
			}	
			else {
				//alert("Error while updating movie info.");
				props.setMsgBar ({msgText : "Error while updating movie info.", visibleMsgBar: true, counter : 0})

			}
        })
		.catch(console.log);
	
*/	

		//var url = 'https://localhost:44367/api/movie/' + data.Id
		var url = 'https://localhost:5001/api/movie/' + data.Id
		
		axios.put(url, data, {
        headers: {
            'Content-Type': 'application/json'
        	}	
		})
		.then(response => { 
			console.log(response)
			props.setMsgBar ({msgText : "Movie was successfully updated.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
		})
		.catch(error => {
			console.log(error.response)
			props.setMsgBar ({msgText : "Error while updating movie info.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
		});

	}
	
	//if (updatesuccess === true) {
	//	return (<Redirect to='/MoviesList2' />)
	//}
	
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
		<center>Movie Edit</center>
	
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
			/>
			<Form.Field
				id='releaseDate'
				name='releaseDate'
				control={DatePicker}
				label='Release Date'
				style={{width:'450px !important;'}}
				//value={formInputValue.releaseDate || ''}
				//onChange={handleChange}
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
			/>  
			<Form.Field
				id='price'
				name='price'
				control={Input}
				label='Price'
				style={{width:'450px'}}
				value={formInputValue.price || 0}
				onChange={handleChange}
			/>  
			<Form.Field
				id='rating'
				name='rating'
				control={Input}
				label='Rating'
				style={{width:'450px'}}
				value={formInputValue.rating || ''}
				onChange={handleChange}
			/>  
		<Button type='submit'>Update</Button>	 <Button type='reset' onClick={handleReset}>Reset</Button>	
		</Form>
	    <div><br></br></div>
		<Link to={'/MoviesList2'}>Back to Movies List</Link>
	</div>
	)
	
};

export default MovieEditForm