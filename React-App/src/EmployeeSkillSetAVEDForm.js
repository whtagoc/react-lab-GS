import React, { useState, useEffect, useReducer } from 'react';
import axios from "axios";
import { Form, Input,  Button, Select} from 'semantic-ui-react';

const InitFormValue = {  
	empSkillSetId :  "", 
    empId : "",
    empSkillProfLevel  : "",
    skillId  : "",
    skillCode : "",
    skillDescr : ""
};



const InitFormError = {   
	empSkillSetIdError: false,
	empIdError: false,
	empSkillProfLevelError: false,
	skillIdError: false
};

const EmployeeSkillSetAVEDForm = props => {	
	const [empSkillSetPerSkill, setEmpSkillSetPerSkill] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [formInputValue, setFormInputValue] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [formInputError, setFormInputError] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormError);
	const [skillsSetOption, setSkillsSetOption] = useState([]);
	const [modalFormDisable, setModalFormDisable] = useState(true)
	const [showLoader, setShowLoader] = useState(false)

	useEffect(() => {
		var url = 'https://localhost:5001/api/EmployeeSkillSet/GetEmployeeSkillSetPerSkill'

		const data = { 
			"Id" : props.empSkillSetId
		};
		  
		console.log("Data Param Param Param Param Param Param")
		console.log(data)
	
		setShowLoader(true)
		axios
		.post(url, data, {
			headers: {
				'Content-Type': 'application/json'
			}	
		})
		.then(
			
			empSkillSet => {
				
				setShowLoader(false)
				console.log("Return empSkillSet.data Return Return Return")			
				console.log(empSkillSet.data)
				setEmpSkillSetPerSkill(empSkillSet.data)
				console.log("empSkillSetPerSkill")
				console.log(empSkillSetPerSkill)
				setFormInputValue(empSkillSetPerSkill)
				console.log("formInputValue")
				console.log(formInputValue)
			}
		)
		.catch( error => { 
			console.log("Employee Skill Set error.request = " + error.request)
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
		
	}, [empSkillSetPerSkill.empId]);
	

	useEffect(() => {

		var url = 'https://localhost:5001/api/Skill/GetSkillddlist'
		axios
			.get(url)
		.then(
	
		  Result => {
			setSkillsSetOption(Result.data)
			console.log("Skills dropdownlist")
			console.log(Result.data)
		  }
		  
		);

        
	}, [empSkillSetPerSkill]);	


													
	const handleChange = (e, { name, value }) => {
		setFormInputValue({[name] : value})
	}

	const handleReset = (event) => {
		setFormInputValue(empSkillSetPerSkill)

		if (props.formMode === "Add") {
			setFormInputValue(InitFormValue)
		} else {
		  setFormInputValue(empSkillSetPerSkill)
		}
		setFormInputError(InitFormError)
	}


	const handleSubmit = (event)  => {
		event.preventDefault();

		let error = false;

		if (formInputValue.skillId === '') {
			setFormInputError({skillId: { content: 'Please enter Skill', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({skillIdError : false})
		}

		if (formInputValue.empSkillProfLevel === '') {
			setFormInputError({empSkillProfLevelError: { content: 'Please enter Profiency Level', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({empSkillProfLevelError : false})
		}


		if (error) {
			return
		}

		const data = { 
            id                  : formInputValue.empSkillSetId,
			EmployeeId 			: formInputValue.empId,
			SkillId 		    : formInputValue.skillId,
			ProficiencyLevel	: formInputValue.empSkillProfLevel
		};

		var url = 'https://localhost:5001/api/EmployeeSkillSet/' + data.id
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
			props.setMsgBar ({msgText : "Employee SkillSets was successfully updated.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
			props.setReloadEmpSkillSetList(new Date)
		})
		.catch(error => {
			console.log(error.response)
			props.setMsgBar ({msgText : "Error while updating Employee SkillSets.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
			props.setReloadEmpSkillSetList(new Date)
		});

	}

	const handleDelete = (event)  => {
		event.preventDefault();

		const data = { 
            Id : formInputValue.empSkillSetId,
		};

		var url = 'https://localhost:5001/api/EmployeeSkillSet/' + data.Id

		axios.delete(url, {
			headers: {
				'Content-Type': 'application/json'
				}	
			})
			.then(response => { 
				console.log(response)
				props.handleCloseModal()
				props.setMsgBar ({msgText : "Employee SkillSets was successfully deleted.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
				props.setReloadEmpSkillSetList(new Date)
			})
			.catch(error => {
				console.log(error.response)
				props.handleCloseModal()
				props.setMsgBar ({msgText : "Error while deleting Employee SkillSets.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
				props.setReloadEmpSkillSetList(new Date)
			});	

	}

	const handleSave = (event)  => {
		event.preventDefault();

		let error = false;

		if (formInputValue.skillId === '') {
			setFormInputError({skillIdError: { content: 'Please enter Skill', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({skillIdError : false})
		}

		if (formInputValue.empSkillProfLevel === '') {
			setFormInputError({empSkillProfLevelError: { content: 'Please enter Profiency Level', pointing: 'left' }})
			error = true
		} else {
			setFormInputError({empSkillProfLevelError : false})
		}

		if (error) {
			return
		}

		const data = { 
			EmployeeId 			: props.employee.id,
			SkillId 		    : formInputValue.skillId,
			ProficiencyLevel	: formInputValue.empSkillProfLevel
		};

		console.log("Insert Insert  Insert Insert Insert Insert Insert Insert Insert Insertdata" )
		console.log(data)
		console.log("props.employee")
		console.log(props.employee)

		var url = 'https://localhost:5001/api/EmployeeSkillSet/' 
	
		axios.post(url, data, {
		headers: {
			'Content-Type': 'application/json'
			}	
		})
		.then(response => { 
			console.log("sucess")
			console.log(response)
			props.handleCloseModal()
			props.setReloadEmpSkillSetList(new Date)
			props.setMsgBar ({msgText : "Employee Skill Set was successfully save.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
		})
		.catch(error => {
			console.log(error.response)
			//props.setReloadEmpSkillSetList(new Date)
			props.setMsgBar ({msgText : "Error while saving Employee SkillSets.", visibleMsgBar: true, counter : 0, colorMsgBar:'red'})
		});



		//props.handleCloseModal()
		//props.setMsgBar ({msgText : "Project allocation was successfully save.", visibleMsgBar: true, counter : 0, colorMsgBar:'green'})
		//props.setReloadEmpSkillSetList(new Date)
	}	

	return (
   
	<div>
		{/* {props.project.id} */}
		<Form onSubmit={handleSubmit}>
			<Form.Field
				id='skillId'
				name='skillId'
				control={Select}
				options={skillsSetOption}
				label='Skill'
				style={{width:'450px'}}
				value={formInputValue.skillId || ""}
				onChange={handleChange}
				disabled = {modalFormDisable}
				error={formInputError.skillIdError}
			/>
			<Form.Field
				id='empSkillProfLevel'
				name='empSkillProfLevel'
				control={Input}	
				label='Profiency Level'
				style={{width:'450px'}}
				value={formInputValue.empSkillProfLevel || ""}
				onChange={handleChange}
				disabled = {modalFormDisable}
				error={formInputError.empSkillProfLevelError}
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

export default EmployeeSkillSetAVEDForm