import React, {useState, useEffect  } from "react";
import axios from "axios";
import ProjectEditTabs from "./ProjectEditTabs";


const ProjectEdit = props => {	
    const [project, setProject] = useState([]);	

	useEffect(() => {
		var id  = props.match.params.id;
		
		var url = 'https://localhost:5001/api/project/' + id

		axios
		.get(url)
		.then(project => setProject(project.data));

	}, [props.match.params.id]);


	return (
		<div>
			<ProjectEditTabs movies={project} setMsgBar= {props.setMsgBar}/>
		</div>
    );
  
}
 
export default ProjectEdit;


 