import React, { useState, useEffect, useReducer } from 'react'
import axios from "axios";
import { Link, Redirect } from 'react-router-dom'
import { Form, Input, Button, Select} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';

const InitFormValue = {   
			   id: "",
	   employeeNo: "",
	  	 lastName: "",
	 	firstName: "",
	   middleName: "",
	 	birthDate: "",
	  	   gender: "",
 	civilStatusID: "",
	nationalityID: ""
};

const InitFormError = {   
		       iderror: false,
	   employeeNoerror: false,
		 lastNameerror: false,
		firstNameerror: false,
	   middleNameerror: false,
		birthDateerror: false,
		   gendererror: false,
	civilStatusIDerror: false,
	nationalityIDerror: false
};

//setstate({
//	...state,
//	{
//		title: InitFormValue.title,
//		genre: In,
//	}
//})

const EmployeeEditForm = props => {	
	const [employee, setEmployee] = useState(props.employee);
	const [genderOption, setGenderOption] = useState(props.genderOption);
	const [civilstatusOption, setCivilstatusOption] = useState(props.civilstatusOption);
	const [nationalityOption, setNationalityOption] = useState(props.nationalityOption);

	const [formInputValue, setFormInputValue] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [formInputError, setFormInputError] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormError);
	const [formDisable, setFormDisable] = useState(true);
	const [addsuccess, setAddsuccess] = useState(false);
	const [deletesuccess, setDeletesuccess] = useState(false);
	const [empID, setEmpID] = useState(null);
	
	useEffect(() => {	

		setEmployee(props.employee);
		setFormInputValue(employee)

		setGenderOption (props.genderOption)
		setCivilstatusOption(props.civilstatusOption)
		setNationalityOption(props.nationalityOption)


		if (props.formMode === "View" || props.formMode === "Delete") {
			setFormDisable(true)
		}
		else {	
			setFormDisable(false)
		}

	}, [props.employee, employee,props.genderOption, props.civilstatusOption, props.nationalityOption])

	useEffect(() => {	

		setGenderOption (props.genderOption)
		setCivilstatusOption(props.civilstatusOption)
		setNationalityOption(props.nationalityOption)

	}, [props.genderOption, props.civilstatusOption, props.nationalityOption])



	const isValidaEntry = ( ) => {

		let isValid = true;

		if (formInputValue.employeeNo === '') {
			setFormInputError({employeeNoerror: { content: 'Please enter Employee No', pointing: 'left' }})
			isValid = false
		} else {
			setFormInputError({employeeNoerror : false})
		}

		if (formInputValue.lastName === '') {
			setFormInputError({lastNameerror: { content: 'Please enter Last Name', pointing: 'left' }})
			isValid = false
		} else {
			setFormInputError({lastNameerror : false})
		}

		if (formInputValue.firstName === '') {
			setFormInputError({firstNameerror: { content: 'Please enter First Name', pointing: 'left' }})
			isValid = false
		} else {
			setFormInputError({firstNameerror : false})
		}

		if (formInputValue.firstName === '') {
			setFormInputError({firstNameerror: { content: 'Please enter First Name', pointing: 'left' }})
			isValid = false
		} else {
			setFormInputError({firstNameerror : false})
		}

		if (formInputValue.birthDate === '') {
			setFormInputError({birthDateerror: { content: 'Please enter Date of Birth', pointing: 'left' }})
			isValid = false
		} else {
			setFormInputError({birthDateerror : false})
		}

		if (formInputValue.gender === '') {
			setFormInputError({gendererror: { content: 'Please enter Gender', pointing: 'left' }})
			isValid = false
		} else {
			setFormInputError({gendererror : false})
		}

		if (formInputValue.civilStatusID === '') {
			setFormInputError({civilStatusIDerror: { content: 'Please enter Civil Status', pointing: 'left' }})
			isValid = false
		} else {
			setFormInputError({civilStatusIDerror : false})
		}

		if (formInputValue.nationalityID === '') {
			setFormInputError({nationalityIDerror: { content: 'Please enter Nationality', pointing: 'left' }})
			isValid = false
		} else {
			setFormInputError({nationalityIDerror : false})
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
		  setFormInputValue(employee)
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
			employeeNo : formInputValue.employeeNo,
			lastName : formInputValue.lastName,
			firstName : formInputValue.firstName,
			middleName : formInputValue.middleName,
			birthDate : formInputValue.birthDate,
			gender : formInputValue.gender,
			civilStatusID : formInputValue.civilStatusID,
			nationalityID : formInputValue.nationalityID
		};

		
		var url = 'https://localhost:5001/api/employee/' + data.ID
		
		axios.put(url, data, {
        headers: {
            'Content-Type': 'application/json'
        	}	
		})
		.then(response => { 
			console.log(response)
			props.setMsgBar ({msgText : "Employee was successfully updated.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
		})
		.catch(error => {
			console.log(data)

			console.log(error.response)
			props.setMsgBar ({msgText : "Error while updating Employee info.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
		});

	}

	const handleSave = (event)  => {
		event.preventDefault();

		if (!isValidaEntry()) {
			return	
		};

		const data = { 
			employeeNo : formInputValue.employeeNo,
			lastName : formInputValue.lastName,
			firstName : formInputValue.firstName,
			middleName : formInputValue.middleName,
			birthDate : formInputValue.birthDate,
			gender : formInputValue.gender,
			civilStatusID : formInputValue.civilStatusID,
			nationalityID : formInputValue.nationalityID
		};

		var url = 'https://localhost:5001/api/Employee/' 
	
		axios.post(url, data, {
		headers: {
			'Content-Type': 'application/json'
			}	
		})
		.then(response => { 
			console.log("sucess")
			console.log(response)
			setEmpID(response.data.id)
			props.setMsgBar ({msgText : "Employee was successfully save.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
			setAddsuccess(true)
		})
		.catch(error => {
			console.log(error.response)
			props.setMsgBar ({msgText : "Error while saving Employee info.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
			setAddsuccess(false)
		});
	}

	if (addsuccess === true) {
		var redi = '/EmployeeEdit/' +  empID; 
		return (<Redirect to={redi} />)
	}

	const handleDelete = (event)  => {
		event.preventDefault();

		var id = formInputValue.id
	
		var url = 'https://localhost:5001/api/Employee/' + id
		
		axios.delete(url, {
        headers: {
            'Content-Type': 'application/json'
        	}	
		})
		.then(response => { 
			console.log(response)
			props.setMsgBar ({msgText : "Employee was successfully Deleted.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
			setDeletesuccess(true)
		})
		.catch(error => {
			console.log(error.response)
			props.setMsgBar ({msgText : "Error while Deleting Employee info.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
		});	
	}

	if (deletesuccess === true) {
		var redi = '/EmployeeList' 
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
				id='employeeNo'
				name='employeeNo'
				control={Input}
				label='Employee No.'
				style={{width:'450px'}}
				value={formInputValue.employeeNo || ''}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.employeeNoerror}
			/>
			<Form.Field
				id='lastName'
				name='lastName'
				control={Input}
				label='Last Name.'
				style={{width:'450px'}}
				value={formInputValue.lastName || ''}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.lastNameerror}
			/>
			<Form.Field
				id='firstName'
				name='firstName'
				control={Input}
				label='First Name.'
				style={{width:'450px'}}
				value={formInputValue.firstName || ''}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.firstNameerror}
			/>
			<Form.Field
				id='middleName'
				name='middleName'
				control={Input}
				label='Middle Name.'
				style={{width:'450px'}}
				value={formInputValue.middleName || ''}
				onChange={handleChange}
				disabled ={formDisable}
			/>
			<Form.Field
				id='birthDate'
				name='birthDate'
				control={DatePicker}
				label='Date of Birth'
				style={{width:'450px !important;'}}
				//value={formInputValue.birthDate || ''}
				//onChange={handleChange}
				onChange={date => handleFormateDate(date)} 
				selected={Date.parse(formInputValue.birthDate) || ''} 
				dateFormat="yyyy/MM/dd"
				disabled ={formDisable}
				error={formInputError.birthDateerror}
			/> 
			<Form.Field
				id='gender'
				name='gender'
				control={Select}
				options={genderOption}
				label='Gender'
				style={{width:'450px'}}
				value={formInputValue.gender || ''}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.gendererror}
			/> 
			<Form.Field
				id='civilStatusID'
				name='civilStatusID'
				control={Select}
				options={civilstatusOption}
				label='Civil Status'
				style={{width:'450px'}}
				value={formInputValue.civilStatusID || ''}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.civilStatusIDerror}
			/>  
			<Form.Field
				id='nationalityID'
				name='nationalityID'
				control={Select}
				options={nationalityOption}
				label='Nationality'
				style={{width:'450px'}}
				value={formInputValue.nationalityID || ''}
				onChange={handleChange}
				disabled ={formDisable}
				error={formInputError.nationalityIDerror}
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
		<Link to={'/EmployeeList'}>Back to Employee List</Link>
	</div>
	)
	
};

export default EmployeeEditForm