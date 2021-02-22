import React, {useState, useEffect, useReducer } from "react";
import axios from "axios";
import EmployeeTableListSemUI from "./EmployeeTableListSemUI";
import EmployeeInputSearchSemUI from "./EmployeeInputSearchSemUI"
import CustomLoader  from './CustomLoader'

const InitFormValue = {   
	searchStringEmpNo: "",
	searchStringEmpLastName : "",
	searchStringEmpFirstName : "",
	searchStringEmpMiddleName : "",
};

const EmployeeList = ( props) => {
	const [inputSearch, setInputSearch] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [inputFormValue, setInputFormValue] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [employees, setEmployees] = useState([]);
	const [showLoader, setShowLoader] = useState(false)

	console.log("Start EmployeesList");
	console.log(props.userAccessRight)

	useEffect(() => {
		var url = 'https://localhost:5001/api/Employee/GetEmployeeList'

		const data = { 
			"EmpNo" 	 : inputSearch.searchStringEmpNo,
			"EmpLastName" : inputSearch.searchStringEmpLastName, 
			"EmpFirstName" 	 : inputSearch.searchStringEmpFirstName,
			"EmpMiddleName"   : inputSearch.searchStringEmpMiddleName
		};
		  
		console.log("Data")
		console.log(data)

		setShowLoader(true)
		axios
		.post(url, data, {
			headers: {
				'Content-Type': 'application/json'
			}	
		})
		.then(
			
			employees => {
				setShowLoader(false)
				setEmployees(employees.data)
			}
		)
		.catch( error => { 
			console.log("Employee error.request = " + error.request)
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
		

	}, [inputSearch,props.setMsgBar]);


	const handleChange = (e, { name, value }) => {
		setInputFormValue({[name] : value})
	}

	const handleReset = (event) => {
		setInputFormValue(InitFormValue)
		
	}
	
	const handleSubmit = event => {
		event.preventDefault();
		props.setMsgBar({visibleMsgBar:true, counter:0, msgText:"Succdessfully Submitted"});
		setInputSearch(((state, newState) => ({ ...state, ...newState }), inputFormValue))

		if (inputFormValue.searchStringProjType === "") {
			setInputSearch ({searchStringProjType : "0"});
		}
		else {
			setInputSearch ({searchStringProjType : inputFormValue.searchStringProjType});	
		}

		console.log( ' handleSubmit EmployeeeList ');
		console.log(inputSearch)
		
	}
	
	//<EmployeeInputSearchSemUI SubmitHandler={handleSubmit} OnChangeHandler={handleChange} OnhandleReset={handleReset} inputFormValue={inputFormValue} />
	
	
    return (	
		<div>
			
			<EmployeeTableListSemUI employees={employees} setMsgBar={props.setMsgBar} userAccessRights={props.userAccessRights}/>
		    <CustomLoader active={showLoader} size={'small'}/>
		</div>
		
    );
}
 
export default EmployeeList;