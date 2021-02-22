import React, {useState, useEffect  } from "react";
import axios from "axios";
import EmployeeEditForm from "./EmployeeEditForm";


const EmployeeEdit = props => {	
    const [employee, setEmployee] = useState([]);	

	useEffect(() => {
		var id  = props.match.params.id;
		
		var url = 'https://localhost:5001/api/Employee/' + id

		axios
		.get(url)
		.then(employee => setEmployee(employee.data));

	}, [props.match.params.id]);


	return (
		<div>
			<EmployeeEditForm employees={employee} setMsgBar= {props.setMsgBar}/>
		</div>
    );
  
}
 
export default EmployeeEdit;


 