import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { Table, Pagination } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import ProjectEmpAssignEdit from './ProjectEmpAssignEdit'

const ProjectsEmpAssignmentTableListSemUI = props => {	
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

  //var totalPages;
  var items = [];
 
  console.log("ProjectsTableListSemUI");

  useEffect(() => {

    setData(_.sortBy(props.projectEmpAssignList,  ["id"]));
    setItemsPerPage(5)
    //totalPages = data.length / itemsPerPage;   
    setTotalPages(data.length / itemsPerPage);  
    console.log("props.userAccessRights")
    console.log(props.userAccessRights)
  }, [props.projectEmpAssignList, data.length, itemsPerPage])

  useEffect(() => {

   console.log("ProjectsEmpAssignTableListSemUI props.compUserAccess props.compUserAccess props.compUserAccess")
   console.log(props.userAccessRights)
   setUserAccessRights(props.userAccessRights)
   console.log(userAccessRights)
    
    if (props.userAccessRights.length > 0) {
      console.log(userAccessRights)
      const results =userAccessRights.filter(mod =>
        mod.modName.toString().toLowerCase() === 'project');
      
      if (results[0].modAllowInsert === "Y") {
        setAllowAdd(true)
      }
      else {
        setAllowAdd(false)
      }

      if (results[0].modAllowView === "Y") {
        setAllowView(true)
      }
      else {
        setAllowView(false)
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

      if (results[0].modAllowUpdate === "Y" && results[0].modAllowDelete === "Y" && results[0].modAllowView === "Y") {
        setShowActionCol(true)
      }
      else {
        setShowActionCol(false)
      } 
    }

  }, [userAccessRights, props.userAccessRights])


  const handleSort = (clickedColumn) => () => {
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
    items = items.reverse();
  }
  
  console.log("before return");
  console.log(direction);
  console.log(items);
 
    return (
      <div>
        {props.projId}
      <Table sortable celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'empNo' ? direction : null}
              onClick={handleSort('empNo')}
              width = {1}
            >
              Employee No
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'empLastName' ? direction : null}
              onClick={handleSort('empLastName')}
            >
              Employee LastName
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'empFirstName' ? direction : null}
              onClick={handleSort('empFirstName')}
            >
              Employee FirstName
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'empMiddleName' ? direction : null}
              onClick={handleSort('empMiddleName')}
            >
              Employee MiddeName
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'empPercentAllocation' ? direction : null}
              onClick={handleSort('empPercentAllocation')}
            >
              % Allocation
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'empPositionDesc' ? direction : null}
              onClick={handleSort('empPositionDesc')}
            >
              Position
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'assignedDateFrom' ? direction : null}
              onClick={handleSort('assignedDateFrom')}
            >
              Assigned Date From
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'assignedDateTo' ? direction : null}
              onClick={handleSort('assignedDateTo')}
            >
              Assigned Date To
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
          {_.map(items, ({ assignId, projId, empNo, empLastName, empFirstName, empMiddleName, empPercentAllocation, empPositionDesc,assignedDateFrom,assignedDateTo}) => (
            <Table.Row key={assignId}>
              <Table.Cell>{empNo}</Table.Cell>
              <Table.Cell>{empLastName}</Table.Cell>
              <Table.Cell>{empFirstName}</Table.Cell>
              <Table.Cell>{empMiddleName}</Table.Cell>
              <Table.Cell>{empPercentAllocation}</Table.Cell>
              <Table.Cell>{empPositionDesc}</Table.Cell>
              <Table.Cell> {moment(assignedDateFrom).format("YYYY-MM-DD")}</Table.Cell>
              <Table.Cell> {moment(assignedDateTo).format("YYYY-MM-DD")}</Table.Cell>
              { showActionCol
                ? <Table.Cell>
                  {allowView
                    ? <span> 
                        <Link to={`/MovieEdit/${projId}`}>View</Link>&nbsp;&nbsp;
                      </span>
                    :<></>  
                  }
                  {allowUp
                    ? <span> 
                       {/* <Link to={`/ProjectEmpAssignEdit/${projId}`}>Edit</Link>&nbsp;&nbsp; */}
                       <ProjectEmpAssignEdit project={props.project} empAssignId={assignId} setMsgBar={props.setMsgBar} setReloadProjEmpAssignList={props.setReloadProjEmpAssignList}/>&nbsp;&nbsp; 
                      </span>
                    :<></>  
                  } 
                  {allowDel
                    ? <span>
                        <Link to={`/MovieDelete/${projId}`}>Delete</Link>
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
        {allowAdd
        ? <div> 
          <Link  to={'/ProjectAdd'}>Add New Project Rources</Link>
          </div>
        :<></>
        }
       
      
      </div>
   
    )
  }
  

  export default ProjectsEmpAssignmentTableListSemUI;