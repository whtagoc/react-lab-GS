import React, {useState, useEffect  } from "react";
import axios from "axios";
import { Dropdown } from 'semantic-ui-react'


const MoviesGenredropdownlistSemUI = props => {
	const [genreOption, SetgenreOption] = useState([]);
	const [searchString, setSearchString] = useState('');
	var tempOption = [];
	
	useEffect(() => {
		var url = 'https://localhost:44367/api/movie/Genre'
		
		axios
		.get(url)
		.then(Result => SetgenreOption(Result.data));
		
	}, [searchString]);
	
	genreOption.map(function (item,i) {
		tempOption.push({"text":item,"value":item})
	});
	
	console.log(tempOption)
    return (
        <div>
        {/*Genre: <Select name="SelGenre1" options={tempOption} style={{width: '5'}} />*/}
        
        <Dropdown clearable options={tempOption} selection  id="SelGenre" name="SelGenre"/>
			
			 Genre:<select id="SelGenre2" name="SelGenre2">
				<option value="">All</option>
			 {genreOption.map((item) => (
				
				<option key={item} value={item}>{item}</option>
			 ))}
			</select>
			
        </div>
    )
};

export default MoviesGenredropdownlistSemUI