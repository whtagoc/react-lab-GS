import React, { useState, useReducer } from 'react'
import { Form, Input,  Button, Grid } from 'semantic-ui-react'
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
const InitFormValue = {   
	  userid: "",
 	password: "",
};

const InitFormError = {   
	useridError: false,
  passwordError: false,
};


const LogIn = props => {	
	const [formInputValue, setFormInputValue] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [formInputError, setFormInputError] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormError);
			
	const handleChange = (e, { name, value }) => {
		setFormInputValue({[name] : value})
	}
	
	const handleReset = (event) => {
		setFormInputValue(InitFormValue)
	}

	const handleSubmit = (event)  => {
		event.preventDefault();
	
		const data = { 
				  username : formInputValue.userid,
			    password : formInputValue.password,
		};
		
		let error = false;

		if (formInputValue.userid === '') {
			setFormInputError({useridError: { content: 'Please enter User', pointing: 'below' }})
			error = true
		} else {
			setFormInputError({useridError : false})
			error = false
		}

		if (formInputValue.password === '') {
			setFormInputError({passwordError: { content: 'Please enter Password', pointing: 'below' }})
			error = true
		} else {
			setFormInputError({passwordError: false})
			error = false
		}

		if (error) {
			return
		}

		var url = 'https://localhost:5001/api/users/Authentication' 
	
		axios.post(url, data, {
		headers: {
			'Content-Type': 'application/json'
			}	
		})
		.then(response => { 
			console.log("LogIn Authentication success")
			console.log(response.data[0].userId)
			console.log(response.data[0])
			if (response.data.length > 0) {
				props.setIsLogin(true)
				props.setUserSession(response.data[0])
				//console.log(props.userSession)  
				console.log("Redirect")  
				props.history.push("/Main");
				//return <Redirect to={"/Home"} />
				
			}
			else {
				props.setIslogin(false)
				props.setUserSession(response.data[0])
				setFormInputError({useridError: { content: 'Invalid userid.', pointing: 'below' }})
				setFormInputError({passwordError: { content: 'Invalid password.', pointing: 'below' }})
			}
			
		})
		.catch(error => {
			console.log(error.response)
			//props.setIslogin(false)
		});
	}
	
	return (
	
	<div>
		<Grid  style={{maxHeight: '100vh', minHeight: '100vh',marginTop:0}} color={"gray"}>   
		<Grid.Row></Grid.Row>
			<Grid.Row centered  columns={3}>
				<Grid.Column celled="true" centered="true"  style={{border: "2px solid green", borderColor:"#eae7e7", borderRadius:"8px", padding:"20px"}}>
					<Form onSubmit={handleSubmit}>
						<Form.Field 
							id='userid'
							name='userid'
							control={Input}
							label='UserID'
							style={{width:'400px'}}
							value={formInputValue.userid || ''}
							onChange={handleChange}
							error={formInputError.useridError}
						/>
						<Form.Field 
							id='password'
							name='password'
							control={Input}
							label='Password'
							style={{width:'400px'}}
							value={formInputValue.password || ''}
							onChange={handleChange}
							error={formInputError.passwordError}
						/>
						<Button type='submit'>LOGIN</Button>	
					</Form>
		
				</Grid.Column>
			</Grid.Row>
			<Grid.Row></Grid.Row>
		</Grid>
  
	</div>
	)
};

export default LogIn