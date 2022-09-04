import React, { useState, useEffect, useReducer } from 'react'
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { Form, Input,  Button, Select} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

const InitFormValue = {   
    id : "",
  code : "",
  customerId : "", 
  typeId : "",
  name : "",
  description : "",
  billingCost : "",
  billingTermID : "",
  billingCurrencyId : "",
  contractStartDate : "",
  contractEndDate : ""
};

const InitFormError = {   
	codeError: false,
	customerIdError: false,
	typeIdError: false,
	nameError: false,
	descriptionError: false,
	billingCostError: false,
	billingTermIDError: false,
	billingCurrencyIdError: false,
	contractStartDateError: false,
	contractEndDateError: false
};

const ProjectAVEDForm = props => {	
	const [project, setProject] = useState(props.project);
	const [formInputValue, setFormInputValue] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [formInputError, setFormInputError] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormError);
	const [formDisable, setFormDisable] = useState(true);
	const [addsuccess, setAddsuccess] = useState(false);
	const [deletesuccess, setDeletesuccess] = useState(false);
	const [projID, setProjID] = useState(null);
	
	useEffect(() => {	
		setProject(props.project);
		setFormInputValue(project)
		console.log("props.customerOption")
		console.log(props.customerOption)
		
		if (props.formMode === "View" || props.formMode === "Delete") {
			setFormDisable(true)
		}
		else {	
			setFormDisable(false)
		}

	}, [props.project, project])
												
	const handleChange = (e, { name, value }) => {
		setFormInputValue({[name] : value})
	}

	const handleReset = (event) => {
		if (props.formMode === "Add") {
			setFormInputValue(InitFormValue)
		} else {
		  setFormInputValue(project)
		}
		setFormInputError(InitFormError)
	}

	const handleFormateDate = (date,name) => {
		
		if (date === null) {
			setFormInputValue({[name] : date})		
		}
		else {
			var dd = date.getDate();
			var mm = date.getMonth(mm) + 1;
			var yyyy = date.getFullYear();
			var selectedDate = yyyy + "-" + mm + "-" + dd ;
			setFormInputValue({[name] : selectedDate})	
		}

	}


	const handleSubmit = (event)  => {
		event.preventDefault();
	
		const data = { 
            id                : formInputValue.id,
			code 			  : formInputValue.code,
			customerId 		  : formInputValue.customerId,
			typeId 			  : formInputValue.typeId,
			name			  : formInputValue.name,
			description 	  : formInputValue.description,
			billingCost 	  : formInputValue.billingCost,
			billingTermID 	  : formInputValue.billingTermID,
			billingCurrencyId : formInputValue.billingCurrencyId,
			contractStartDate : formInputValue.contractStartDate,
			contractEndDate   : formInputValue.contractEndDate
		};

		var url = 'https://localhost:5001/api/project/' + data.id
		console.log("dataaaaaaa")
		console.log(data)
		axios.put(url, data, {
        headers: {
            'Content-Type': 'application/json'
        	}	
		})
		.then(response => { 
			console.log(response)
			props.setMsgBar ({msgText : "Project was successfully updated.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
		})
		.catch(error => {
			console.log(error.response)
			props.setMsgBar ({msgText : "Error while updating Project info.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
		});

	}

	const handleSave = (event)  => {
		event.preventDefault();
		
		let error = false;

		if (formInputValue.code === '') {
			setFormInputError({codeError: { content: 'Please enter Code', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({codeError : false})
		}

		if (formInputValue.customerId === '') {
			setFormInputError({customerIdError: { content: 'Please enter Customer', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({customerIdError : false})
		}

		if (formInputValue.typeId === '') {
			setFormInputError({typeIdError: { content: 'Please enter Type', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({typeIdError : false})
		}

		if (formInputValue.name === '') {
			setFormInputError({nameError : { content: 'Please enter Name', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({nameError : false})
		}

		if (formInputValue.description === '') {
			setFormInputError({descriptionError : { content: 'Please enter Description', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({descriptionError : false})
		}

		if (formInputValue.billingTermID === '') {
			setFormInputError({billingTermIDError  : { content: 'Please enter Billing Term', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({billingTermIDError : false})
		}

		if (formInputValue.billingCost === '') {
			setFormInputError({billingCostError  : { content: 'Please enter Billing Cost', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({billingCostError : false})
		}

		if (formInputValue.billingCurrencyId  === '') {
			setFormInputError({billingCurrencyIdError  : { content: 'Please enter Billing Currency', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({billingCurrencyIdError : false})
		}

		if (formInputValue.contractStartDate === '') {
			setFormInputError({contractStartDateError  : { content: 'Please enter Contract Start Date', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({contractStartDateError : false})
		}

		if (formInputValue.contractEndDate  === '') {
			setFormInputError({contractEndDateError  : { content: 'Please enter Contract End Date', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({contractEndDateError : false})
		}

		

		if (error) {
			return
		}

		const data = { 
			code 			  : formInputValue.code,
			customerId 		  : formInputValue.customerId,
			typeId 			  : formInputValue.typeId,
			name			  : formInputValue.name,
			description 	  : formInputValue.description,
			billingCost 	  : formInputValue.billingCost,
			billingTermID 	  : formInputValue.billingTermID,
			billingCurrencyId : formInputValue.billingCurrencyId,
			contractStartDate : formInputValue.contractStartDate,
			contractEndDate   : formInputValue.contractEndDate
		};

		var url = 'https://localhost:5001/api/Project/' 
	
		axios.post(url, data, {
		headers: {
			'Content-Type': 'application/json'
			}	
		})
		.then(response => { 
			console.log("sucess")
			console.log(response)
			setProjID(response.data.id)
			props.setMsgBar ({msgText : "Project was successfully save.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
			setAddsuccess(true)
		})
		.catch(error => {
			console.log(error.response)
			props.setMsgBar ({msgText : "Error while saving Project info.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
			setAddsuccess(false)
		});
	}

	if (addsuccess === true) {
		var redi = '/ProjectAVEDTabs/' +  projID; 
		return (<Redirect to={redi} />)
	}

	const handleDelete	 = (event)  => {
		event.preventDefault();

		var id = formInputValue.id
	
		var url = 'https://localhost:5001/api/Project/' + id
		
		
		axios.delete(url, {
        headers: {
            'Content-Type': 'application/json'
        	}	
		})
		.then(response => { 
			console.log(response)
			props.setMsgBar ({msgText : "Project was successfully Deleted.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
			setDeletesuccess(true)
		})
		.catch(error => {
			console.log(error.response)
			props.setMsgBar ({msgText : "Error while Deleting Project info.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
		});	
	}

	if (deletesuccess === true) {
		var redi = '/ProjectList' 
		return (<Redirect to={redi} />)
	}
	
	return (
	
	<div>
		<Form onSubmit={handleSubmit}>
			<Form.Field
				id='code'
				name='code'
				label='Code'
				control={Input}
				style={{width:'450px'}}
				value={formInputValue.code}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.codeError}
			/>
			<Form.Field
				id='customerId'
				name='customerId'
				control={Select}
				options={props.customerOption}
				label='Customer'
				style={{width:'450px'}}
				value={formInputValue.customerId || 0}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.customerIdError}
			/>
			<Form.Field
				id='typeId'
				name='typeId'
				control={Select}
				options={props.projTypeOption}
				label='Type'
				style={{width:'450px'}}
				value={formInputValue.typeId || 0}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.typeIdError}
			/>
			<Form.Field
				id='name'
				name='name'
				control={Input}
				label='Name'
				style={{width:'450px'}}
				value={formInputValue.name || ''}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.nameError}
			/>
			<Form.Field
				id='description'
				name='description'
				control={Input}
				label='Description'
				style={{width:'450px'}}
				value={formInputValue.description || ''}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.descriptionError}
			/>
			<Form.Field
				id='billingTermID'
				name='billingTermID'
				control={Select}
				options={props.projTermsOption}
				label='Billing Term'
				style={{width:'450px'}}
				value={formInputValue.billingTermID || 0}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.billingTermIDError}
			/>
			<Form.Field
				id='billingCost'
				name='billingCost'
				control={Input}
				label='Billing Cost'
				style={{width:'450px'}}
				value={formInputValue.billingCost || ''}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.billingCostError}
			/>
      		<Form.Field
				id='billingCurrencyId'
				name='billingCurrencyId'
				control={Select}
				options={props.projCurrencyOption}
				label='Billing Currency'
				style={{width:'450px'}}
				value={formInputValue.billingCurrencyId || ''}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.billingCurrencyIdError}
			/>
			<Form.Field
				id='contractStartDate'
				name='contractStartDate'
				control={DatePicker}
				label='Contract Start Date'
				style={{width:'450px !important;'}}
				onChange={(date => handleFormateDate(date,"contractStartDate"))} 
				selected={Date.parse(formInputValue.contractStartDate) || ''} 
				dateFormat="yyyy/MM/dd"
				disabled ={formDisable}
				error={formInputError.contractStartDateError}
			/> 
      		<Form.Field
				id='contractEndDate'
				name='contractEndDate'
				control={DatePicker}
				label='Contract End Date'
				style={{width:'450px !important;'}}
				onChange={(date => handleFormateDate(date,"contractEndDate"))} 
				selected={Date.parse(formInputValue.contractEndDate) || ''} 
				dateFormat="yyyy/MM/dd"
				disabled ={formDisable}
				error={formInputError.contractEndDateError}
				 
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
		<Link to={'/ProjectList'}>Back to Project List</Link>
	</div>
	)
	
};

export default ProjectAVEDForm