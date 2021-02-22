import React, { useState, useEffect, useReducer } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
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

const ProjectEditForm = props => {	
	const [project, setProject] = useState(props.project);
	const [formInputValue, setFormInputValue] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue)
	
	useEffect(() => {	
		setProject(props.project);
		setFormInputValue(project)
		console.log("props.customerOption")
		console.log(props.customerOption)
	}, [props.project, project])
													
	const handleChange = (e, { name, value }) => {
		setFormInputValue({[name] : value})
	}

	const handleReset = (event) => {
		setFormInputValue(project)
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
			/>
			<Form.Field
				id='name'
				name='name'
				control={Input}
				label='Name'
				style={{width:'450px'}}
				value={formInputValue.name || ''}
				onChange={handleChange}
			/>
			<Form.Field
				id='description'
				name='description'
				control={Input}
				label='Description'
				style={{width:'450px'}}
				value={formInputValue.description || ''}
				onChange={handleChange}
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
			/>
			<Form.Field
				id='BillingCost'
				name='BillingCost'
				control={Input}
				label='Billing Cost'
				style={{width:'450px'}}
				value={formInputValue.billingCost || ''}
				onChange={handleChange}
			/>
      		<Form.Field
				id='BillingCurrency'
				name='BillingCurrency'
				control={Select}
				options={props.projCurrencyOption}
				label='Billing Currency'
				style={{width:'450px'}}
				value={formInputValue.billingCurrencyId || ''}
				onChange={handleChange}
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
			/>  
		<Button type='submit'>Update</Button>	 <Button type='reset' onClick={handleReset}>Reset</Button>	
		</Form>
	    <div><br></br></div>
		<Link to={'/MoviesList2'}>Back to Movies List</Link>
	</div>
	)
	
};

export default ProjectEditForm