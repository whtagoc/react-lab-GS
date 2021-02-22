import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { Table, Pagination } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const MoviesTableListSemUI = props => {	
  const [column, setColumn] = useState(null);
  const [data, setData] = useState([]);
  const [direction, setDirection] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(5);
  const [allowAdd, setAllowAdd] = useState(false);
  const [allowDel, setAllowDel] = useState(false);
  const [allowUp,  setAllowUp] = useState(false);
  const [showActionCol,  setShowActionCol] = useState(false);
  const [userAccessRights, setUserAccessRights] = useState(props.userAccessRights)
  
  //var totalPages;
  var items = [];
 
  console.log("MoviesTableListSemUI");

  useEffect(() => {

    setData(_.sortBy(props.movies,  ["id"]));
    setItemsPerPage(5)
    //totalPages = data.length / itemsPerPage;   
    setTotalPages(data.length / itemsPerPage);  
    console.log("props.userAccessRights")
    console.log(props.userAccessRights)
  }, [props.movies, data.length, itemsPerPage])

  useEffect(() => {

   console.log("MoviesTableListSemUI props.compUserAccess props.compUserAccess props.compUserAccess")
   console.log(props.userAccessRights)
   setUserAccessRights(props.userAccessRights)
   console.log(userAccessRights)
    
    if (props.userAccessRights.length > 0) {
      console.log(userAccessRights)
      const results =userAccessRights.filter(mod =>
        mod.modName.toString().toLowerCase() === 'movie');
      
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

      if (results[0].modAllowUpdate === "Y" && results[0].modAllowDelete === "Y") {
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
      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === 'id' ? direction : null}
              onClick={handleSort('id')}
            >
              ID
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'title' ? direction : null}
              onClick={handleSort('title')}
            >
              Title
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'releasedate' ? direction : null}
              onClick={handleSort('releasedate')}
            >
              Release Date
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'genre' ? direction : null}
              onClick={handleSort('genre')}
            >
              Genre
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'price' ? direction : null}
              onClick={handleSort('price')}
            >
              Price
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === 'rating' ? direction : null}
              onClick={handleSort('rating')}
            >
              Rating
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
          {_.map(items, ({ id, title, releaseDate, genre, price, rating}) => (
            <Table.Row key={id}>
              <Table.Cell>{id}</Table.Cell>
              <Table.Cell>{title}</Table.Cell>
              <Table.Cell>{releaseDate}</Table.Cell>
              <Table.Cell>{genre}</Table.Cell>
              <Table.Cell>{price}</Table.Cell>
              <Table.Cell>{rating}</Table.Cell>
              { showActionCol
                ? <Table.Cell>
                  {allowUp
                    ? <span> 
                        <Link to={`/MovieEdit/${id}`}>Edit</Link>&nbsp;&nbsp;
                      </span>
                    :<></>  
                  } 
                  {allowDel
                    ? <span>
                        <Link to={`/MovieDelete/${id}`}>Delete</Link>l
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
          <Link  to={'/MovieAdd'}>Add New Movie</Link>
          </div>
        :<></>
        }
       
      </div>
   
    )
  }

  export default MoviesTableListSemUI;