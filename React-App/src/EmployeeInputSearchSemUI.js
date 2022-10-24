import React, {useState, useEffect  } from "react";
import { Form, Input,  Button, Select } from 'semantic-ui-react'
import axios from "axios";


const EmployeeInputSearchSemUI = props => {
    const [genreOption, SetgenreOption] = useState([]);
    const [searchString, setSearchString] = useState('');
	var tempOption = [];

    //useEffect(() => {
    //    //var url = 'https://localhost:44367/api/movie/Genre'
    //    var url = 'https://localhost:5001/api/movie/Genre'
    //    
    //    setSearchString('')
	//	
	//	axios
	//	.get(url)
	//	.then(Result => SetgenreOption(Result.data));
	//	
    //}, [searchString]);
    
    //genreOption.map(function (item,i) {
    //    tempOption.push({"text":item,"value":item})
    //    return 0
    //});
    

    return (
        <div>
			<Form onSubmit={props.SubmitHandler}>
				<Form.Group inline>
                    <label style={{width:'65px'}}>Employee No</label>
					<Form.Field
                        id='searchStringEmpNo'
                        name='searchStringEmpNo'
        				control={Input}
                        style={{width:'300px'}}
                        clearable={"true"}
                        value={props.inputFormValue.searchStringEmpNo || ""}
                        onChange={props.OnChangeHandler}
      				/>
                    <label style={{width:'80px'}}>Employee Last Name</label>  
                    <Form.Field
                        id='searchStringEmpLastName'
                        name='searchStringEmpLastName'
        				control={Input}
                        style={{width:'250px'}}
                        clearable={true}
                        value={props.inputFormValue.searchStringEmpLastName}
                        onChange={props.OnChangeHandler}
      				/>
				</Form.Group>
                <Form.Group inline>
                    <label style={{width:'65px'}}>Employee First Name</label>
                    <Form.Field
                        id='searchStringEmpFirstName'
                        name='searchStringEmpFirstName'
        				control={Input}
                        style={{width:'300px'}}
                        clearable={"true"}
                        value={props.inputFormValue.searchStringEmpFirstName || ""}
                        onChange={props.OnChangeHandler}
      				/>
                    <label style={{width:'80px'}}>Employee Middle Name</label>  
                    <Form.Field
                        id='searchStringEmpMiddleName'
                        name='searchStringEmpMiddleName'
        				control={Input}
                        style={{width:'250px'}}
                        clearable={"true"}
                        value={props.inputFormValue.searchStringEmpMiddleName || ""}
                        onChange={props.OnChangeHandler}
      				/>
                    <Button type='submit'>Search</Button>
                    <Button type='Reset' onClick={props.OnhandleReset}>Reset</Button>
                </Form.Group>
                
			</Form>
        </div>
    )
};

export default EmployeeInputSearchSemUI