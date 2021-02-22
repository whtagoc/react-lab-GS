import React, {useState, useEffect  } from "react";
import { Form, Input,  Button, Select } from 'semantic-ui-react'
import axios from "axios";


const ProjectsInputSearchSemUI = props => {
    const [projectTypeOption, SetProjectTypeOption] = useState([]);
    const [searchString, setSearchString] = useState('');
	var tempOption = [];

    useEffect(() => {
        var url = 'https://localhost:5001/api/ProjectType'
        
        setSearchString('')
		
		axios
		.get(url)
        .then(

            Result => {
                SetProjectTypeOption(Result.data)
                console.log("ProjectType")
                console.log(Result.data)
			}
        )
        .catch( error => { 
			console.log("Projects Types error.request = " + error.request)
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
			  console.log('Error while Getting Project Types', error.message);
			}
			console.log("error.config = " + error.config);
		});
        

    
    }, [searchString]);
    
    projectTypeOption.map(function (item,i) {
        tempOption.push({"text":item.typeDescription,"value":item.id})
        return 0
    });
    

    return (
        <div>
			<Form onSubmit={props.SubmitHandler}>
				<Form.Group inline>
                    <label style={{width:'50px'}}>Customer</label>
					<Form.Field
                        id='searchStringCustomerName'
                        name='searchStringCustomerName'
        				control={Input}
                        style={{width:'300px'}}
                        clearable={true}
                        value={props.inputFormValue.searchStringCustomerName || ""}
                        onChange={props.OnChangeHandler}
      				/>
                    <label style={{width:'80px'}}>Project Type</label>  
                    <Form.Field
                        id='searchStringProjType'
                        name='searchStringProjType'
        				control={Select}
                        style={{width:'250px'}}
                        options={tempOption}
                        clearable={true}
                        value={props.inputFormValue.searchStringProjType}
                        onChange={props.OnChangeHandler}
      				/>
				</Form.Group>
                <Form.Group inline>
                    <label style={{width:'50px'}}>Name</label>
                    <Form.Field
                        id='searchStringProjName'
                        name='searchStringProjName'
        				control={Input}
                        style={{width:'300px'}}
                        clearable={true}
                        value={props.inputFormValue.searchStringProjName || ""}
                        onChange={props.OnChangeHandler}
      				/>
                    <label style={{width:'80px'}}>Code</label>  
                    <Form.Field
                        id='searchStringProjCode'
                        name='searchStringProjCode'
        				control={Input}
                        style={{width:'250px'}}
                        clearable={true}
                        value={props.inputFormValue.searchStringProjCode || ""}
                        onChange={props.OnChangeHandler}
      				/>
                    <Button type='submit'>Search</Button>
                    <Button type='Reset' onClick={props.OnhandleReset}>Reset</Button>
                </Form.Group>
                
			</Form>
        </div>
    )
};

export default ProjectsInputSearchSemUI