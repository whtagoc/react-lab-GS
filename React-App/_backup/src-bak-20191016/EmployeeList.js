import React, { Component } from "react";
import Contacts from "./contacts";
 
class EmployeeList extends Component {
	
	state = {
        contacts: []
      }	
	  
	componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then((data) => {
          this.setState({ contacts: data })
        })
        .catch(console.log)
      }	  
	
  render() {
    return (
      <div>
        <h2>EmployeeList</h2>
        <table>
			<row>
				 <th>
					 ID
				 </th>
				 <th>
					 Last Name
				 </th>
				 <th>
					 First Name
				 </th>
				 <th>
					/Middle Name
				 </th>
			 </row>
		</table>
	  <Contacts contacts={this.state.contacts} />
	  </div>
	  
    );
  }
}
 
export default EmployeeList;