import React, { useState, useEffect, useReducer } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ProjectEmpAssignEditForm from "./ProjectEmpAssignEditForm"

const ProjectEmpAssignEdit = (props) => {
  const [openModal, setOpenModal] = useState(false)

  const handleOpenModal = () => {
		setOpenModal(true)
  }
  
  const handleCloseModal = () => {
		setOpenModal(false)
	}

  return ( 
    <Modal 
      closeOnDimmerClick={false}
      dimmer={'inverted'} 
      trigger={<Link onClick={handleOpenModal}>Edit</Link>}
      open={openModal}
      onClose={handleCloseModal}
      closeIcon
    >
      <Modal.Header>{props.empAssignId} Edit Resource Allocation (Edit) - Project Code : {props.project.code} </Modal.Header>
      <Modal.Content>
        <ProjectEmpAssignEditForm 
          project={props.project} 
          empAssignId={props.empAssignId} 
          handleCloseModal={handleCloseModal}
          setMsgBar={props.setMsgBar}
          setReloadProjEmpAssignList={props.setReloadProjEmpAssignList}
        />
      </Modal.Content>
    </Modal>
  )
}

export default ProjectEmpAssignEdit