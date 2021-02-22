import React, { useState, useEffect, useReducer } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'
import { Form, Input, Button, Tab} from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import ProjectEditForm from './ProjectEditForm'
import ProjectEmpAssignmentList from './ProjectEmpAssignmentList'
//import ProjectResourceAllocationEditForm from './ProjectResourceAllocationEditForm'

const ProjectEditTabs = props => {
  const [project, setProject] = useState([]);	
  //const [customer, setCustomer] = useState([]);	
  const [customerOption, setCustomerOption] = useState([]);
  const [projTypeOption, setProjTypeOption] = useState([]);	
  const [projTermsOption, setProjTermsOption] = useState([]);	
  const [projCurrencyOption, setProjCurrencyOption] = useState([]);	
  var panes = []

  useEffect(() => {
		var id  = props.match.params.id;
		var url = 'https://localhost:5001/api/project/' + id

		axios
		.get(url)
    .then(result => setProject(result.data));

    url = 'https://localhost:5001/api/CustomerCompany/GetCustomerCompddlist'
    axios
		.get(url)
    .then(

      Result => {
        setCustomerOption(Result.data)
        console.log("CustomerCompany")
        console.log(Result.data)
       
      }
      
    );
   
    console.log("customerOption")
    console.log(customerOption)

    url = 'https://localhost:5001/api/projectType/GetProjTypeddlist'
    axios
		.get(url)
    .then(

      Result => {
        setProjTypeOption(Result.data)
        console.log("CustomerCompany")
        console.log(Result.data)
       
      }
      
    );

    console.log("projTypeOption")  
    console.log(projTypeOption)

    url = 'https://localhost:5001/api/ProjectTerms/GetProjBillingTermsddlist'
    axios
		.get(url)
    .then(

      Result => {
        setProjTermsOption(Result.data)
        console.log("CustomerCompany")
        console.log(Result.data)
       
      }
      
    );

    console.log("projTermsOption")  
    console.log(projTermsOption)

    url = 'https://localhost:5001/api/Currency/GetCurrencyddlist'
    axios
		.get(url)
    .then(

      Result => {
        setProjCurrencyOption(Result.data)
        console.log("CustomerCompany")
        console.log(Result.data)
       
      }
      
    );

    console.log("projCurrencyOption")  
    console.log(projCurrencyOption)  

  }, [props.match.params.id]);

 
  console.log("customerOption")
  console.log(customerOption)
  console.log(project.Id)
    
  panes = [
    { menuItem: 'Project Information (Edit)', render: () => <Tab.Pane>
                                                        <ProjectEditForm 
                                                          project={project} 
                                                          customerOption={customerOption} 
                                                          projTypeOption={projTypeOption}
                                                          projTermsOption={projTermsOption}
                                                          projCurrencyOption={projCurrencyOption}
                                                          setMsgBar={props.setMsgBar}
                                                        />
                                                      </Tab.Pane> },
    { menuItem: 'Resource Allocation (Add/Edit/View/Delete)', render: () => <Tab.Pane>
                                                        <ProjectEmpAssignmentList
                                                           project={project}                                                          userAccessRights={props.userAccessRights}
                                                          setMsgBar={props.setMsgBar}
                                                        />
                                                        </Tab.Pane> },
  ]

  return (<Tab panes={panes} />)

 }
export default ProjectEditTabs