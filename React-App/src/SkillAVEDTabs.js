import React, { useState, useEffect, useReducer } from 'react'
import axios from "axios";
import {Tab} from 'semantic-ui-react'
import SkillAVEDForm from "./SkillAVEDForm";

const SkillAVEDTabs = props => {
  const [skill, setSkill] = useState([]);
  const [genderOption, setGenderOption] = useState([]);
  const [civilstatusOption, setCivilstatusOption] = useState([]);
  const [nationalityOption, setNationalityOption] = useState([]);
	
  const [tabMode, setTabMode] = useState(null);	
  var panes = []

  useEffect(() => {
	  
	  var id  = props.match.params.id;
	  var url = 'https://localhost:5001/api/Skill/' + id

	  if (props.tabMode !== "Add") {
		  axios
		  .get(url)
		  .then(result => setSkill(result.data));
	  }

    if (props.tabMode === "Add" || props.tabMode === "Delete" || props.tabMode === "View") {
      setTabMode("(" + props.tabMode + ")")
    }
    else {
      setTabMode("(Edit)")
    }

  }, [props.match.params.id]);

 
  panes = [
    { menuItem: 'Skill ' + tabMode, render: () => <Tab.Pane>
                                                        <SkillAVEDForm 
                                                          skill={skill}  
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
export default SkillAVEDTabs