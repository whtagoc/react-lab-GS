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


  var totalPages;
  var items = [];
 
 
  console.log("MoviesTableListSemUI");

  useEffect(() => {

    setData(_.sortBy(props.movies,  ["id"]));
    totalPages = data.length / itemsPerPage;   

  }, [props.movies])

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

    //setData (data.reverse());
    items = items.reverse();
    console.log("handleSort desc");
    console.log(items);
    setDirection(direction === 'ascending' ? 'descending' : 'ascending',)

  }

  const setPageNum = (event, { activePage }) => {
    setPage(activePage);
  }
  
  
  totalPages = data.length / itemsPerPage;
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
            <Table.HeaderCell>
              Action
            </Table.HeaderCell>
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
              <Table.Cell>
                <Link to={`/MovieEdit/${id}`}>Edit</Link>&nbsp;&nbsp;
					      <Link to={`/MovieDelete/${id}`}>Delete</Link>
              </Table.Cell>
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

      </div>
   
    )
  }

  export default MoviesTableListSemUI;