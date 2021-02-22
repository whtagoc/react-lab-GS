import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ProjectEmpAssignEditForm from "./ProjectEmpAssignEditForm"

const ProjectEmpAssignEdit = (props) => (
  <Modal
    closeOnDimmerClick={false}
    trigger={<Link>Edit</Link>} dimmer={'inverted'} 
  >
    <Modal.Header>Edit Resource Allocation (Edit) - Project Code : {props.project.code}</Modal.Header>
    <Modal.Content>
      <ProjectEmpAssignEditForm project={props.project} EmpAssignEmpId={props.EmpAssignEmpId} />
    </Modal.Content>
  </Modal>
)

export default ProjectEmpAssignEdit