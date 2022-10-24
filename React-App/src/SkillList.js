import React, {useState, useEffect, useReducer } from "react";
import axios from "axios";
import SkillTableListSemUI from "./SkillTableListSemUI";
import EmployeeInputSearchSemUI from "./EmployeeInputSearchSemUI"
import CustomLoader  from './CustomLoader'

const InitFormValue = {   
	searchStringSkillCode: "",
	searchStringskillDescr : ""
};

const SkillList = ( props) => {
	const [inputSearch, setInputSearch] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [inputFormValue, setInputFormValue] = useReducer((state, newState) => ({ ...state, ...newState }), InitFormValue);
	const [skills, setSkills] = useState([]);
	const [showLoader, setShowLoader] = useState(false)

	console.log("Start SkillList");
	console.log(props.userAccessRight)

	useEffect(() => {
		var url = 'https://localhost:5001/api/Skill/GetSkillList'

		const data = { 
			"SkillCode" 	: inputSearch.searchStringSkillCode,
			"SkillDescr" 	: inputSearch.searchStringskillDescr 
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
			
			skills => {
				setShowLoader(false)
				setSkills(skills.data)
			}
		)
		.catch( error => { 
			console.log("Skills error.request = " + error.request)
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

		console.log( ' handleSubmit SkillList ');
		console.log(inputSearch)
		
	}

	//<EmployeeInputSearchSemUI SubmitHandler={handleSubmit} OnChangeHandler={handleChange} OnhandleReset={handleReset} inputFormValue={inputFormValue} />
	
    return (	
		<div>
			<SkillTableListSemUI skills={skills} setMsgBar={props.setMsgBar} userAccessRights={props.userAccessRights}/>
		    <CustomLoader active={showLoader} size={'small'}/>
		</div>
		
    );
}
 
export default SkillList;