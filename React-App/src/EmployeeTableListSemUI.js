import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { Table, Pagination } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const EmployeeTableListSemUI = props => {	
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
 
  console.log("EmployeeTableListSemUI");

  useEffect(() => {

    setData(_.sortBy(props.employees,  ["ID"]));
    setItemsPerPage(5)
    //totalPages = data.length / itemsPerPage;   
    setTotalPages(data.length / itemsPerPage);  
    console.log("props.userAccessRights")
    console.log(props.userAccessRights)
    
  }, [props.employees, data.length, itemsPerPage])

  useEffect(() => {

   console.log("EmployeeTableListSemUI props.compUserAccess props.compUserAccess props.compUserAccess")
   console.log(props.userAccessRights)
   setUserAccessRights(props.userAccessRights)
   console.log(userAccessRights)
    
    if (props.userAccessRights.length > 0) {
      console.log(userAccessRights)
      const results =userAccessRights.filter(mod =>
        mod.modName.toString().toLowerCase() === 'employee');
      
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

      if (results[0].modAllowUpdate === "Y" || results[0].modAllowDelete === "Y" || results[0].modAllowView === "Y") {
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
              sorted={column === 'empID' ? direction : null}
              onClick={handleSort('empID')}
            >
              ID
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'empNo' ? direction : null}
              onClick={handleSort('empNo')}
            >
              No
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'empLastName' ? direction : null}
              onClick={handleSort('empLastName')}
            >
              Last Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'empFirstName' ? direction : null}
              onClick={handleSort('empFirstName')}
            >
              First Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'empMiddleName' ? direction : null}
              onClick={handleSort('empMiddleName')}
            >
              Middle Name
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'empGenderDescr' ? direction : null}
              onClick={handleSort('empGenderDescr')}
            >
              Gender
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'empBirthDate' ? direction : null}
              onClick={handleSort('empBirthDate')}
            >
              Birth Date
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
          {_.map(items, ({ empID, empNo, empLastName, empFirstName, empMiddleName, empGenderDescr, empBirthDate}) => (
            <Table.Row key={empID}>
              <Table.Cell>{empID}</Table.Cell>
              <Table.Cell>{empNo}</Table.Cell>
              <Table.Cell>{empLastName}</Table.Cell>
              <Table.Cell>{empFirstName}</Table.Cell>
              <Table.Cell>{empMiddleName}</Table.Cell>
              <Table.Cell>{empGenderDescr}</Table.Cell>
              <Table.Cell>{empBirthDate}</Table.Cell>
              { showActionCol
                ? <Table.Cell>
                  {allowView
                    ? <span> 
                        <Link to={`/EmployeeView/${empID}`}>View</Link>&nbsp;&nbsp;
                      </span>
                    :<></>  
                  }
                  {allowUp
                    ? <span> 
                        <Link to={`/EmployeeEdit/${empID}`}>Edit</Link>&nbsp;&nbsp;
                      </span>
                    :<></>  
                  } 
                  {allowDel
                    ? <span>
                        <Link to={`/EmployeeDelete/${empID}`}>Delete</Link>
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
          <Link  to={'/EmployeeAdd'}>Add New Employee</Link>
          </div>
        :<></>
        }
       
      </div>
   
    )
  }

  export default EmployeeTableListSemUI;