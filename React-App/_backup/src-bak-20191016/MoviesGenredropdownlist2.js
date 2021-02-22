import React, {useState, useEffect  } from "react";
import axios from "axios";
//import Select from 'react-select';


const MoviesGenredropdownlist2 = props => {
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
		tempOption.push({"value":item,"label":item})
	});
	
	console.log(tempOption)
    return (
        <div>
		{/*Genre: <Select name="SelGenre1" options={tempOption} style={{width: '5'}} />*/}
			
			 Genre:<select id="SelGenre" name="SelGenre">
				<option value="">All</option>
			 {genreOption.map((item) => (
				
				<option key={item} value={item}>{item}</option>
			 ))}
			</select>
			
        </div>
    )
};

export default MoviesGenredropdownlist2