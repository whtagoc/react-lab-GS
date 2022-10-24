import React, {useState, useEffect, useReducer  } from "react";
import axios from "axios";
import ProjectsTableListSemUI from "./ProjectsTableListSemUI";
import ProjectsInputSearchSemUI from "./ProjectsInputSearchSemUI"
import CustomLoader  from './CustomLoader'

const InitFormValue = {   
	searchStringCustomerName: "",
	searchStringProjType : "0",
	searchStringProjName : "",
	searchStringProjCode : "",
};

const ProjectList = ( props	) => {
	const [inputSearch, setInputSearch] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [inputFormValue, setInputFormValue] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [projects, setProjects] = useState([]);
	const [showLoader, setShowLoader] = useState(false)

	console.log("Start ProjectsList ");
	console.log(props.userAccessRight)

	useEffect(() => {
		var url = 'https://localhost:5001/api/Project/GetProjectsList'

		const data = { 
			"CustName" 	 : inputSearch.searchStringCustomerName,
			"ProjTypeId" : inputSearch.searchStringProjType, 
			"ProjName" 	 : inputSearch.searchStringProjName,
			"ProjCode"   : inputSearch.searchStringProjCode
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
			
			projects => {
				setShowLoader(false)
				setProjects(projects.data)
			}
		)
		.catch( error => { 
			console.log("Projects error.request = " + error.request)
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

		console.log( ' handleSubmit ProjectList ');
		console.log(inputSearch)
		
	}
	
	
    return (	
		<div>
			<ProjectsInputSearchSemUI SubmitHandler={handleSubmit} OnChangeHandler={handleChange} OnhandleReset={handleReset} inputFormValue={inputFormValue} />
			<ProjectsTableListSemUI projects={projects} setMsgBar={props.setMsgBar} userAccessRights={props.userAccessRights}/>
		    <CustomLoader active={showLoader} size={'small'}/>
		</div>
		
    );
}
 
export default ProjectList;