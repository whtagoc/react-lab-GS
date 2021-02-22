import React, { useState, useEffect, useReducer } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Form, Input,  Button, Select } from 'semantic-ui-react'

const InitFormValue = {   
		   id: "",
		title: "",
  releaseDate: "",
		genre: "",
	   rating: "",
	    price: ""
};

const MovieEditForm = props => {	
	
	const [movies, setMovies] = useState(props.movies);
	const [formInputValue, setFormInputValue] = useReducer((state, newState) => ({ ...state, ...newState }),
	InitFormValue)

	useEffect(() => {
		
		setMovies(props.movies);
		setFormInputValue(props.movies)

	}, [props.movies])

																
	const handleChange = (e, { name, value }) => {

		setFormInputValue({[name] : value})

	}
	
	const handleReset = (event) => {
		setFormInputValue(props.movies)
	}
	
	
	const handleSubmit = (event)  => {
		event.preventDefault();
	
		const data = { 
					 id : formInputValue.id,
				  title : formInputValue.title,
			releaseDate : formInputValue.releaseDate,
			      genre : formInputValue.genre,
				 price  : formInputValue.price,
				 rating : formInputValue.rating
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
				//this.setState({updatesuccess : true})
			}	
			else {
				alert("Error while updating movie info.");
			}
			
        })
        .catch(console.log);
	}
	
	
	//if (this.state.updatesuccess === true) {
	//	return (<Redirect to='/MoviesList' />)
    //}

	return (
	
	<div>
		<center><h1>Movie Edit</h1></center>
	
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
				control={Input}
				label='Release Date'
				style={{width:'450px'}}
				value={formInputValue.releaseDate || ''}
				onChange={handleChange}
				
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
		<Button type='submit'  >Update</Button>	 <Button type='Reset'  >Reset</Button>	
		</Form>
	    <div><br></br></div>
		<Link to={'/MoviesList2'}>Back to Movies List</Link>
	</div>
	)
	
};

export default MovieEditForm