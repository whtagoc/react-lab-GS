import React, { useState, useEffect, useReducer } from 'react'
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { Form, Input, Button, Select} from 'semantic-ui-react'

const InitFormValue = {   
			   id: "",
	   skillCode: "",
	   skillDescr: ""
};

const InitFormError = {   
		       iderror: false,
		skillCodeerror: false,
		skillDescrerror: false
};

//setstate({
//	...state,
//	{
//		title: InitFormValue.title,
//		genre: In,
//	}
//})

const SkillAVEDForm = props => {	
	const [skill, setSkill] = useState(props.skill);	
	const [formInputValue, setFormInputValue] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [formInputError, setFormInputError] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormError);
	const [formDisable, setFormDisable] = useState(true);
	const [addsuccess, setAddsuccess] = useState(false);
	const [deletesuccess, setDeletesuccess] = useState(false);
	const [skillID, setSkillID] = useState(null);
	
	useEffect(() => {	

		setSkill(props.skill);
		setFormInputValue(skill);

		if (props.formMode === "View" || props.formMode === "Delete") {
			setFormDisable(true)
		}
		else {	
			setFormDisable(false)
		}

	}, [props.skill, skill])

	const isValidaEntry = ( ) => {

		let isValid = true;

		if (formInputValue.skillCode === '') {
			setFormInputError({skillCodeerror: { content: 'Please enter Skill Code', pointing: 'left' }})
			isValid = false
		} else {
			setFormInputError({skillCodeerror : false})
		}

		if (formInputValue.skillDescr === '') {
			setFormInputError({skillDescrerror: { content: 'Please enter Skill Description', pointing: 'left' }})
			isValid = false
		} else {
			setFormInputError({skillDescrerror : false})
		}

		return isValid
	  }
											
	const handleChange = (e, { name, value }) => {
		setFormInputValue({[name] : value})
	}
	
	const handleReset = (event) => {
		if (props.formMode === "Add") {
			setFormInputValue(InitFormValue)
		} else {
		  setFormInputValue(skill)
		}
		setFormInputError(InitFormError)
	}
	
	const handleSubmit= (event)  => {
		event.preventDefault();

		if (!isValidaEntry()) {
			return	
		};
	
		const data = { 
			ID : formInputValue.id,
			SkillCode : formInputValue.skillCode,
			SkillDescr : formInputValue.skillDescr
		};

		
		var url = 'https://localhost:5001/api/skill/' + data.ID
		
		axios.put(url, data, {
        headers: {
            'Content-Type': 'application/json'
        	}	
		})
		.then(response => { 
			console.log(response)
			props.setMsgBar ({msgText : "Skill was successfully updated.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
		})
		.catch(error => {
			console.log(data)

			console.log(error.response)
			props.setMsgBar ({msgText : "Error while updating Skill info.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
		});

	}

	const handleSave = (event)  => {
		event.preventDefault();

		if (!isValidaEntry()) {
			return	
		};

		const data = { 
			SkillCode : formInputValue.skillCode,
			SkillDescr : formInputValue.skillDescr
		};

		var url = 'https://localhost:5001/api/Skill/' 
	
		axios.post(url, data, {
		headers: {
			'Content-Type': 'application/json'
			}	
		})
		.then(response => { 
			console.log("sucess")
			console.log(response)
			setSkillID(response.data.id)
			props.setMsgBar ({msgText : "Skill was successfully save.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
			setAddsuccess(true)
		})
		.catch(error => {
			console.log(error.response)
			props.setMsgBar ({msgText : "Error while saving Skill info.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
			setAddsuccess(false)
		});
	}

	if (addsuccess === true) {
		var redi = '/SkillEdit/' +  skillID; 
		return (<Redirect to={redi} />)
	}

	const handleDelete = (event)  => {
		event.preventDefault();

		var id = formInputValue.id
	
		var url = 'https://localhost:5001/api/Skill/' + id
		
		axios.delete(url, {
        headers: {
            'Content-Type': 'application/json'
        	}	
		})
		.then(response => { 
			console.log(response)
			props.setMsgBar ({msgText : "Skill was successfully Deleted.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
			setDeletesuccess(true)
		})
		.catch(error => {
			console.log(error.response)
			props.setMsgBar ({msgText : "Error while Deleting Skill info.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
		});	
	}

	if (deletesuccess === true) {
		var redi = '/SkillList' 
		return (<Redirect to={redi} />)
	}
	
	//if (updatesuccess === true) {
	//	return (<Redirect to='/MoviesList2' />)
	//}
	
	const handleFormateDate = (date) => {
		if (date === null) {
			setFormInputValue({birthDate : ''})		
		}
		else {
			var dd = date.getDate();
			var mm = date.getMonth(mm) + 1;
			var yyyy = date.getFullYear();
			var selectedDate = yyyy + "-" + mm + "-" + dd ;
			setFormInputValue({birthDate : selectedDate})	
		}

	}

	return (
	<div>
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
				id='skillCode'
				name='skillCode'
				control={Input}
				label='Code'
				style={{width:'450px'}}
				value={formInputValue.skillCode || ''}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.skillCodeerror}
			/>
			<Form.Field
				id='skillDescr'
				name='skillDescr'
				control={Input}
				label='Description'
				style={{width:'450px'}}
				value={formInputValue.skillDescr || ''}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.skillDescrerror}
			/>
			
			{props.formMode === "Edit"
				?<>
					<Button type='submit'>Update</Button>	 
					<Button type='reset' onClick={handleReset}>Reset</Button>	
				 </>
				:<></>
			}	
			{props.formMode === "Add"
				?<>
					<Button type='save' onClick={handleSave}>Save</Button>	 
					<Button type='reset' onClick={handleReset}>Reset</Button>	
				 </>
				:<></>
			}	
			{props.formMode === "Delete"
				?<>
					<Button type='delete' onClick={handleDelete}>Delete</Button>	 
				 </>
				:<></>
			}

		</Form>
	    <div><br></br></div>
		<Link to={'/SkillList'}>Back to Skill List</Link>
	</div>
	)
	
};

export default SkillAVEDForm