import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { Table, Pagination } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import EmployeeSkillSetAVED from './EmployeeSkillSetAVED'

const EmployeeSkillSetTableListSemUI = props => {	
  const [column, setColumn] = useState(null);
  const [data, setData] = useState([]);
  const [direction, setDirection] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(5);
  const [allowAdd, setAllowAdd] = useState(false);
  const [allowDel, setAllowDel] = useState(false);
  const [allowUp,  setAllowUp] = useState(false);
  const [allowView,  setAllowView] = useState(false);
  const [showActionCol,  setShowActionCol] = useState(false);
  const [userAccessRights, setUserAccessRights] = useState(props.userAccessRights)
  
  var items = [];
 
  console.log("EmployeeSkillSetTableListSemUI");

  useEffect(() => {

    setData(_.sortBy(props.empSkillSets,  ["ID"]));
    setItemsPerPage(5)
    //totalPages = data.length / itemsPerPage;   
    setTotalPages(data.length / itemsPerPage);  
    console.log("props.userAccessRights");
    console.log(props.userAccessRights);
    console.log("props.empSkillSetsempSkillSetsempSkillSetsempSkillSetsempSkillSetsempSkillSets");
    console.log(data);
    
  }, [props.empSkillSets, data.length, itemsPerPage])

  useEffect(() => {

   console.log("EmployeeSkillSetTableListSemUI props.compUserAccess props.compUserAccess props.compUserAccess")
   console.log(props.userAccessRights)
   setUserAccessRights(props.userAccessRights)
   console.log(userAccessRights)
    if (props.userAccessRights.length > 0) {
      console.log(userAccessRights)
      const results =userAccessRights.filter(mod =>
        mod.modName.toString().toLowerCase() === 'skill');
      
      if (results[0].modAllowInsert === "Y") {
        setAllowAdd(true)
      }
      else {
        setAllowAdd(false)
      }

      if (results[0].modAllowUpdate === "Y") {
        setAllowUp(true)
      }
      else {
        setAllowUp(false)
      }

      if (results[0].modAllowDelete === "Y") {
        setAllowDel(true)
      }
      else {
        setAllowDel(false)
      }

      if (results[0].modAllowView === "Y") {
        setAllowView(true)
      }
      else {
        setAllowView(false)
      }

      if ((results[0].modAllowUpdate === "Y" || results[0].modAllowDelete === "Y" || results[0].modAllowView === "Y") || props.listMode == "View") {
        setShowActionCol(true)
      }
      else {
        setShowActionCol(false)
      }
    }


      
  }, [userAccessRights, props.userAccessRights])

  

  const handleSort = (clickedColumn) => () => {
    console.log("clickedColumn = " + clickedColumn);
    console.log("column = " + clickedColumn);
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      //setData (_.sortBy(data,  [clickedColumn]));
      items = _.sortBy(items,  [clickedColumn]);
      console.log("handleSort asc");
      console.log(items);
      setDirection('ascending');
      return
    }
    console.log(props.userAccessRights)
    //setData (data.reverse());
    items = items.reverse();
    console.log("handleSort desc");
    console.log(items);
    setDirection(direction === 'ascending' ? 'descending' : 'ascending',)

  }

  const setPageNum = (event, { activePage }) => {
    setPage(activePage);
  }
  
  //totalPages = data.length / itemsPerPage;   
  items = data.slice(
      (page - 1) * itemsPerPage,
      (page - 1) * itemsPerPage + itemsPerPage
  );

  if (direction === 'ascending') {
    items = _.sortBy(items,  [column]);
  } else if (direction === 'descending') {
    items = _.sortBy(items,  [column]);
    items = items.reverse();
  }
  
  console.log("before return");
  console.log("column " + column);
  console.log(direction);
  console.log(items);
 
    return (
      <div>
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'skillID' ? direction : null}
              onClick={handleSort('skillID')}
            >
              ID
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'skillCode' ? direction : null}
              onClick={handleSort('skillCode')}
            >
              Code
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'skillDescr' ? direction : null}
              onClick={handleSort('skillDescr')}
            >
              Description              
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'empSkillProfLevel' ? direction : null}
              onClick={handleSort('empSkillProfLevel')}
            >
              Profiency Level              
            </Table.HeaderCell>            
            {showActionCol
              ? <Table.HeaderCell style={{display:showActionCol}}> 
                  Action
                </Table.HeaderCell>
              :<></>
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(items, ({empSkillSetId, empSkillProfLevel, skillId, skillCode, skillDescr}) => (
            <Table.Row key={empSkillSetId}>
              <Table.Cell>{skillId}</Table.Cell>
              <Table.Cell>{skillCode}</Table.Cell>
              <Table.Cell>{skillDescr}</Table.Cell>
              <Table.Cell>{empSkillProfLevel}</Table.Cell>
          
              {showActionCol
                ? <Table.Cell>
                  {(allowView && props.listMode === "View") || props.listMode === "Edit"
                    ? <span> 
                        <EmployeeSkillSetAVED employee={props.employee} empSkillSetId={empSkillSetId}  setMsgBar={props.setMsgBar} setReloadEmpSkillSetList={props.setReloadEmpSkillSetList} modalMode={"View"}/>&nbsp;&nbsp; 
                      </span>
                    :<></>  
                  }
                  {allowUp && props.listMode === "Edit"
                    ? <span> 
                       {/* <Link to={`/ProjectEmpAssignEdit/${projId}`}>Edit</Link>&nbsp;&nbsp; */}
                       <EmployeeSkillSetAVED employee={props.employee}  empSkillSetId={empSkillSetId} setMsgBar={props.setMsgBar} setReloadEmpSkillSetList={props.setReloadEmpSkillSetList} modalMode={"Edit"}/>&nbsp;&nbsp; 
                      </span>
                    :<></>  
                  } 
                  {(allowDel && props.listMode === "Delete") || (allowDel && props.listMode === "Edit")
                    ? <span>
                        <EmployeeSkillSetAVED  employee={props.employee} empSkillSetId={empSkillSetId} setMsgBar={props.setMsgBar} setReloadEmpSkillSetList={props.setReloadEmpSkillSetList} modalMode={"Delete"}/>
                      </span>
                    :<></>  
                  }
                  </Table.Cell>
                : <>  
                  </>
              }
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      
      <Pagination
          activePage={page}
          totalPages={totalPages}
          siblingRange={1}
          onPageChange={setPageNum}
        />
        <br></br><br></br>
        {allowAdd && props.listMode != "Delete" && props.listMode != "View"
        ? <div> 
            <EmployeeSkillSetAVED employee={props.employee} setMsgBar={props.setMsgBar} setReloadEmpSkillSetList={props.setReloadEmpSkillSetList} modalMode={"Add"}/>&nbsp;&nbsp; 
          </div>
        :<></>
        }
       
      </div>
   
    )
  }

  export default EmployeeSkillSetTableListSemUI;