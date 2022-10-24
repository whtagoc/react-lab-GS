import React, { useState, useEffect, useReducer } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Form, Input,  Button, Select} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import CustomLoader  from './CustomLoader'

const InitFormValue = {  
	assignId :  "", 
    projId : "",
    empId  : "",
    empNo  : "",
    empLastName : "",
    empFirstName : "",
	empMiddleName : "",
	empPercentAllocation : "",
    empPositionId : "",
    empPositionDesc : "",
    assignedDateFrom : "",
    assignedDateTo : ""
};

const InitFormError = {   
	idError: false,
	empIdError: false,
 	empPercentAllocationError: false,
	empPositionIdError: false,
	assignedDateFromError: false,
	assignedDateToError: false
};

const ProjectEmpAssignEditForm = props => {	
	const [projectEmpAssignPerEmp, setProjectEmpAssignPerEmp] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [formInputValue, setFormInputValue] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [formInputError, setFormInputError] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormError);
	const [employeeOption, setEmployeeOption] = useState([]);
	const [projPositionOption, setProjPositionOption] = useState([]);
	const [modalFormDisable, setModalFormDisable] = useState(true)
	const [showLoader, setShowLoader] = useState(false)

	useEffect(() => {
		var url = 'https://localhost:5001/api/ProjectEmpAssigment/GetProjectEmpAssigmentPerEmp'
		
		const data = { 
			"Id" : props.empAssignId 
		};
		  
		console.log("Data Param Param Param Param Param Param Param")
		console.log(data)
	
		setShowLoader(true)
		axios
		.post(url, data, {
			headers: {
				'Content-Type': 'application/json'
			}	
		})
		.then(
			
			projectEmpAssign => {
				
				setShowLoader(false)
				console.log("Return Return projectEmpAssign.data====================================")			
				console.log(projectEmpAssign.data)
				setProjectEmpAssignPerEmp(projectEmpAssign.data)
				console.log("projectEmpAssignPerEmp====================================")
				console.log(projectEmpAssignPerEmp)
				setFormInputValue(projectEmpAssignPerEmp)
				console.log("formInputValue")
				console.log(formInputValue)
				
			}
		)
		.catch( error => { 
			console.log("Project Emp Assignment error.request = " + error.request)
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

		if (props.modalMode === "View" || props.modalMode === "Delete") {
			setModalFormDisable(true)
		}
		else {
			
			setModalFormDisable(false)
		}
		

	}, [projectEmpAssignPerEmp.projId]);

	useEffect(() => {

		var url = 'https://localhost:5001/api/employee/GetEmployeeddlist'
		axios
			.get(url)
		.then(
	
		  Result => {
			setEmployeeOption(Result.data)
			console.log("Employee dropdownlist")
			console.log(Result.data)
		  }
		  
		);

		url = 'https://localhost:5001/api/projectposition/GetProjPositionddlist'
		axios
			.get(url)
		.then(
	
		  Result => {
			setProjPositionOption(Result.data)
			console.log("Project Position dropdownlist")
			console.log(Result.data)
		  }
		  
		);

	}, [projectEmpAssignPerEmp]);	


													
	const handleChange = (e, { name, value }) => {
		setFormInputValue({[name] : value})
	}

	const handleReset = (event) => {
		setFormInputValue(projectEmpAssignPerEmp)

		if (props.formMode === "Add") {
			setFormInputValue(InitFormValue)
		} else {
		  setFormInputValue(projectEmpAssignPerEmp)
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

		let error = false;

		if (formInputValue.empId === '') {
			setFormInputError({empIdError: { content: 'Please enter Employee', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({empIdError : false})
		}

		if (formInputValue.empPercentAllocation === '') {
			setFormInputError({empPercentAllocationError: { content: 'Please enter Percentage Allocation %', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({empPercentAllocationError : false})
		}

		if (formInputValue.empPositionId === '') {
			setFormInputError({empPositionIdError: { content: 'Please enter Position', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({empPositionIdError : false})
		}

		if (formInputValue.empPositionId === '') {
			setFormInputError({empPositionIdError: { content: 'Please enter Position', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({empPositionIdError : false})
		}

		if (formInputValue.assignedDateFrom === '' || formInputValue.assignedDateFrom == null) {
			setFormInputError({assignedDateFromError: { content: 'Please enter Assign Start Date', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({assignedDateFromError : false})
		}

		if (formInputValue.assignedDateTo === '' || formInputValue.assignedDateTo === null) {
			setFormInputError({assignedDateToError: { content: 'Please enter Assign End Date', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({assignedDateToError : false})
		}

		if (error) {
			return
		}

		const data = { 
            Id                   : formInputValue.assignId,
			ProjId 			     : formInputValue.projId,
			EmployeeId 		     : formInputValue.empId,
			PositionId 		     : formInputValue.empPositionId,
			PercentageAllocation : formInputValue.empPercentAllocation,
			AssignmentStart 	 : formInputValue.assignedDateFrom,
			AssignmentEnd 	     : formInputValue.assignedDateTo
		};

		var url = 'https://localhost:5001/api/ProjectEmpAssigment/' + data.Id
		console.log("dataaaaaaa")
		console.log(data)
		axios.put(url, data, {
        headers: {
            'Content-Type': 'application/json'
        	}	
		})
		.then(response => { 
			console.log(response)
			props.handleCloseModal()
			props.setMsgBar ({msgText : "Project allocation was successfully updated.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
			props.setReloadProjEmpAssignList(new Date)
		})
		.catch(error => {
			console.log(error.response)
			props.setMsgBar ({msgText : "Error while updating Project allocation info.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
			props.setReloadProjEmpAssignList(new Date)
		});

	}

	const handleDelete = (event)  => {
		event.preventDefault();

		const data = { 
            Id : formInputValue.assignId,
		};

		var url = 'https://localhost:5001/api/ProjectEmpAssigment/' + data.Id

		axios.delete(url, {
			headers: {
				'Content-Type': 'application/json'
				}	
			})
			.then(response => { 
				console.log(response)
				props.handleCloseModal()
				props.setMsgBar ({msgText : "Project allocation was successfully deleted.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
				props.setReloadProjEmpAssignList(new Date)
			})
			.catch(error => {
				console.log(error.response)
				props.handleCloseModal()
				props.setMsgBar ({msgText : "Error while deleting Project allocation info.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
				props.setReloadProjEmpAssignList(new Date)
			});	

	}

	const handleSave = (event)  => {
		event.preventDefault();

		let error = false;

		if (formInputValue.empId === '') {
			setFormInputError({empIdError: { content: 'Please enter Employee', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({empIdError : false})
		}

		if (formInputValue.empPercentAllocation === '') {
			setFormInputError({empPercentAllocationError: { content: 'Please enter Percentage Allocation %', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({empPercentAllocationError : false})
		}

		if (formInputValue.empPositionId === '') {
			setFormInputError({empPositionIdError: { content: 'Please enter Position', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({empPositionIdError : false})
		}

		if (formInputValue.empPositionId === '') {
			setFormInputError({empPositionIdError: { content: 'Please enter Position', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({empPositionIdError : false})
		}

		if (formInputValue.assignedDateFrom === '' || formInputValue.assignedDateFrom == null ) {
			setFormInputError({assignedDateFromError: { content: 'Please enter Assign Start Date', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({assignedDateFromError : false})
		}

		if (formInputValue.assignedDateTo === '' || formInputValue.assignedDateTo == null) {
			setFormInputError({assignedDateToError: { content: 'Please enter Assign End Date', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({assignedDateToError : false})
		}

		if (error) {
			return
		}

		const data = { 
			ProjId 			     : props.project.id,
			EmployeeId 		     : formInputValue.empId,
			PositionId 		     : formInputValue.empPositionId,
			PercentageAllocation : formInputValue.empPercentAllocation,
			AssignmentStart 	 : formInputValue.assignedDateFrom,
			AssignmentEnd 	     : formInputValue.assignedDateTo
		};
		console.log(data )
		var url = 'https://localhost:5001/api/ProjectEmpAssigment/' 
	
		axios.post(url, data, {
		headers: {
			'Content-Type': 'application/json'
			}	
		})
		.then(response => { 
			console.log("sucess")
			console.log(response)
			props.handleCloseModal()
			props.setReloadProjEmpAssignList(new Date)
			props.setMsgBar ({msgText : "Project allocation was successfully save.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
		})
		.catch(error => {
			console.log(error.response)
			props.setReloadProjEmpAssignList(new Date)
			props.setMsgBar ({msgText : "Error while saving Project allocation info.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
		});



		//props.handleCloseModal()
		//props.setMsgBar ({msgText : "Project allocation was successfully save.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
		//props.setReloadProjEmpAssignList(new Date)
	}	

	return (
   
	<div>
		{/* {props.project.id} */}
		<Form onSubmit={handleSubmit}>
			<Form.Field
				id='empId'
				name='empId'
				control={Select}
				options={employeeOption}
				label='Employee'
				style={{width:'450px'}}
				value={formInputValue.empId || ""}
				onChange={handleChange}
				disabled = {modalFormDisable}
				error={formInputError.empIdError}
			/>
			<Form.Field
				id='empPercentAllocation'
				name='empPercentAllocation'
				control={Input}	
				label='Percentage Allocation %'
				style={{width:'450px'}}
				value={formInputValue.empPercentAllocation || ""}
				onChange={handleChange}
				disabled = {modalFormDisable}
				error={formInputError.empPercentAllocationError}
			/>
			<Form.Field
				id='empPositionId'
				name='empPositionId'
				control={Select}
				options={projPositionOption}
				label='Position'
				style={{width:'450px'}}
				value={formInputValue.empPositionId || 0}
				onChange={handleChange}
				disabled = {modalFormDisable}
				error={formInputError.empPositionIdError}
			/>
			<Form.Field
				id='AssignmentStartDate'
				name='AssignmentStartDate'
				control={DatePicker}
				label='Assign Start Date'
				style={{width:'450px !important;'}}
				onChange={(date => handleFormateDate(date,"assignedDateFrom"))} 
				selected={Date.parse(formInputValue.assignedDateFrom) || ''} 
				dateFormat="yyyy/MM/dd"
				disabled = {modalFormDisable}
				error={formInputError.assignedDateFromError}
			/> 
      		<Form.Field
				id='AssignmentEndDate'
				name='AssignmentEndDate'
				control={DatePicker}
				label='Assign End Date'
				style={{width:'450px !important;'}}
				onChange={(date => handleFormateDate(date,"assignedDateTo"))} 
				selected={Date.parse(formInputValue.assignedDateTo) || ''} 
				dateFormat="yyyy/MM/dd"
				disabled = {modalFormDisable}
				error={formInputError.assignedDateToError}
			/>  
			{props.modalMode === "Edit"
				?<>
					<Button type='submit'>Update</Button>
					<Button type='reset' onClick={handleReset}>Reset</Button>	
					<Button type='Cancel' onClick={props.handleCloseModal}>Cancel</Button>
				</>
				:<>
				</>
			}	

			{props.modalMode === "Delete"
				?<>
					<Button type='Delete' onClick={handleDelete}>Delete</Button>
					<Button type='Cancel' onClick={props.handleCloseModal}>Cancel</Button>
				</>
				:<>
				</>
			}	

			{props.modalMode === "View"
				?<>
					<Button type='Cancel' onClick={props.handleCloseModal}>Cancel</Button>
				</>
				:<>
				</>
			}

			{props.modalMode === "Add"
				?<>
					<Button type='save' onClick={handleSave}>Save</Button>
					<Button type='reset' onClick={handleReset}>Reset</Button>	
					<Button type='Cancel' onClick={props.handleCloseModal}>Cancel</Button>
				</>
				:<>
				</>
			}	
			 
		</Form>
	</div>
	)
	
};

export default ProjectEmpAssignEditForm