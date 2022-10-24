import React, { useState, useEffect, useReducer } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import EmployeeSkillSetAVEDForm from "./EmployeeSkillSetAVEDForm"

const EmployeeSkillSetAVED = (props) => {
  const [openModal, setOpenModal] = useState(false)
  const [linkText, setLinkText] = useState(props.modalMode)


  useEffect(() => {
    if (props.modalMode === "Add") {
     setLinkText ("Add New Skill Set")
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
     
      <Modal.Header> {props.modalMode} SkillSet for Employee : {props.employee.employeeNo} - {props.employee.lastName}, {props.employee.firstName} {props.employee.middleName}</Modal.Header>
      
      <Modal.Content>
        <EmployeeSkillSetAVEDForm 
          employee={props.employee} 
          empAssignId={props.empAssignId} 
          empSkillSetId={props.empSkillSetId}
          handleCloseModal={handleCloseModal}
          setMsgBar={props.setMsgBar}
          setReloadEmpSkillSetList={props.setReloadEmpSkillSetList}
          modalMode={props.modalMode}
        />
      </Modal.Content>
    </Modal>
  )
}

export default EmployeeSkillSetAVED