import React, { useState, useEffect, useReducer } from 'react'
import axios from "axios";
import {Tab} from 'semantic-ui-react'
import EmployeeAVEDForm from "./EmployeeAVEDForm";

const EmployeeAVEDTabs = props => {
  const [employee, setEmployee] = useState([]);
  const [genderOption, setGenderOption] = useState([]);
  const [civilstatusOption, setCivilstatusOption] = useState([]);
  const [nationalityOption, setNationalityOption] = useState([]);
	
  const [tabMode, setTabMode] = useState(null);	
  var panes = []

  useEffect(() => {
	  
	var id  = props.match.params.id;
	var url = 'https://localhost:5001/api/Employee/' + id

	if (props.tabMode !== "Add") {
		axios
		.get(url)
		.then(result => setEmployee(result.data));
	}

  url = 'https://localhost:5001/api/Gender/GetGenderddlist'
    axios
	.get(url)
    .then(
      Result => {
        setGenderOption(Result.data)
        console.log("Gender")
        console.log(Result.data)
      }
    );
   
    console.log("genderOption")
    console.log(genderOption)

  url = 'https://localhost:5001/api/CivilStatus/GetCivilStatusddlist'
    axios
	.get(url)
    .then(
      Result => {
        setCivilstatusOption(Result.data)
        console.log("Civil Status")
        console.log(Result.data)
      }
    );

  url = 'https://localhost:5001/api/Nationality/GetNationalityddlist'
    axios
	.get(url)
    .then(
      Result => {
        setNationalityOption(Result.data)
        console.log("Nationlity")
        console.log(Result.data)
      }
    ); 

    if (props.tabMode === "Add" || props.tabMode === "Delete" || props.tabMode === "View") {
      setTabMode("(" + props.tabMode + ")")
    }
    else {
      setTabMode("(Edit)")
    }

  }, [props.match.params.id]);

 
  panes = [
    { menuItem: 'Emplyee ' + tabMode, render: () => <Tab.Pane>
                                                        <EmployeeAVEDForm 
                                                          employee={employee} 
                                                          genderOption={genderOption} 
                                                          civilstatusOption={civilstatusOption}
                                                          nationalityOption={nationalityOption} 
                                                          setMsgBar={props.setMsgBar}
                                                          formMode={props.tabMode}
                                                        />
                                                      </Tab.Pane> },
  ]
  
  /* 
  if (props.tabMode != "Add") {
	panes.push({ menuItem: 'Resource Allocation ' + tabMode, render: () => <Tab.Pane>
                                                        <ProjectEmpAssignmentList
                                                          project={project}                                                          
                                                          userAccessRights={props.userAccessRights}
                                                          setMsgBar={props.setMsgBar}
														                              listMode={props.tabMode}
                                                        />
                                                        </Tab.Pane> })
  }
  */
  return (<Tab panes={panes} />)

 }
export default EmployeeAVEDTabs