import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { Table, Pagination } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const SkillTableListSemUI = props => {	
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
 
  console.log("SkillTableListSemUI");

  useEffect(() => {

    setData(_.sortBy(props.skills,  ["ID"]));
    setItemsPerPage(5)
    //totalPages = data.length / itemsPerPage;   
    setTotalPages(data.length / itemsPerPage);  
    console.log("props.userAccessRights")
    console.log(props.userAccessRights)
    
  }, [props.skills, data.length, itemsPerPage])

  useEffect(() => {

   console.log("SkillTableListSemUI props.compUserAccess props.compUserAccess props.compUserAccess")
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
            {showActionCol
              ? <Table.HeaderCell style={{display:showActionCol}}> 
                  Action
                </Table.HeaderCell>
              :<></>
            }
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {_.map(items, ({ skillID, skillCode, skillDescr}) => (
            <Table.Row key={skillID}>
              <Table.Cell>{skillID}</Table.Cell>
              <Table.Cell>{skillCode}</Table.Cell>
              <Table.Cell>{skillDescr}</Table.Cell>
              { showActionCol
                ? <Table.Cell>
                  {allowView
                    ? <span> 
                        <Link to={`/SkillView/${skillID}`}>View</Link>&nbsp;&nbsp;
                      </span>
                    :<></>  
                  }
                  {allowUp
                    ? <span> 
                        <Link to={`/SkillEdit/${skillID}`}>Edit</Link>&nbsp;&nbsp;
                      </span>
                    :<></>  
                  } 
                  {allowDel
                    ? <span>
                        <Link to={`/SkillDelete/${skillID}`}>Delete</Link>
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
          <Link  to={'/SkillAdd'}>Add New Skill</Link>
          </div>
        :<></>
        }
       
      </div>
   
    )
  }

  export default SkillTableListSemUI;