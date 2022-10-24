import React, { useState, useEffect, useReducer } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import ProjectEmpAssignAVEDForm from "./ProjectEmpAssignAVEDForm"

const ProjectEmpAssignAVED = (props) => {
  const [openModal, setOpenModal] = useState(false)
  const [linkText, setLinkText] = useState(props.modalMode)


  useEffect(() => {
    if (props.modalMode === "Add") {
     setLinkText ("Add New Project Rources")
    }
  }, [props.modalMode]);	

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
      open={openModal}
      onClose={handleCloseModal} 
      closeIcon
      trigger={<a style={{cursor:"pointer"}} onClick={handleOpenModal}>{linkText}</a>}
    >
      {props.modalMode === "Add"
        ?<>
          <Modal.Header>Add New Resource Allocation - Project Code : {props.project.code} </Modal.Header>
         </>
        :<>
          <Modal.Header>{props.empAssignId} Edit Resource Allocation ({props.modalMode}) - Project Code : {props.project.code} </Modal.Header>
         </>

      }
      
      <Modal.Content>
        <ProjectEmpAssignAVEDForm 
          project={props.project} 
          empAssignId={props.empAssignId} 
          handleCloseModal={handleCloseModal}
          setMsgBar={props.setMsgBar}
          setReloadProjEmpAssignList={props.setReloadProjEmpAssignList}
          modalMode={props.modalMode}
        />
      </Modal.Content>
    </Modal>
  )
}

export default ProjectEmpAssignAVED