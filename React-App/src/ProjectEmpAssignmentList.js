import React, {useState, useEffect, useReducer  } from "react";
import axios from "axios";
import ProjectsEmpAssignmentTableListSemUI from "./ProjectsEmpAssignmentTableListSemUI";
import ProjectsInputSearchSemUI from "./ProjectsInputSearchSemUI"
import CustomLoader  from './CustomLoader'

const InitFormValue = {   
	searchStringCustomerName: "",
	searchStringProjType : "0",
	searchStringProjName : "",
	searchStringProjCode : "",
};

const ProjectEmpAssignmentList = ( props	) => {
	const [inputSearch, setInputSearch] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [inputFormValue, setInputFormValue] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [projectEmpAssignList, setProjectEmpAssignList] = useState([]);
	const [showLoader, setShowLoader] = useState(false);
	const [reloadProjEmpAssignList, setReloadProjEmpAssignList] = useState(null);

	console.log("Start ProjectsEmpAssignmentList ");
	console.log(props.userAccessRight)

	useEffect(() => {
		var url = 'https://localhost:5001/api/ProjectEmpAssigment/GetProjectEmpAssigmentList'
		
		const data = { 
			"ProjId" : props. project.id 
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
				setProjectEmpAssignList(projects.data)
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
		

	}, [inputSearch,props.ProjId,reloadProjEmpAssignList]);	

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
			<ProjectsEmpAssignmentTableListSemUI  
				project={props.project} 
				projectEmpAssignList={projectEmpAssignList} 
				setMsgBar={props.setMsgBar} 
				userAccessRights={props.userAccessRights}
				setReloadProjEmpAssignList={setReloadProjEmpAssignList}
				listMode={props.listMode}
			/>
		    <CustomLoader active={showLoader} size={'small'}/>
		</div>
		
    );
}
 
export default ProjectEmpAssignmentList;