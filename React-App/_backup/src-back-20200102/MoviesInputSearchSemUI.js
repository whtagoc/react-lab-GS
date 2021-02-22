import React, {useState, useEffect  } from "react";
import { Form, Input,  Button, Select } from 'semantic-ui-react'
import axios from "axios";


const MoviesInputSearchSemUI = props => {
    const [genreOption, SetgenreOption] = useState([]);
    const [searchString, setSearchString] = useState('');
	var tempOption = [];

    useEffect(() => {
        //var url = 'https://localhost:44367/api/movie/Genre'
        var url = 'https://localhost:5001/api/movie/Genre'
        
        setSearchString('')
		
		axios
		.get(url)
		.then(Result => SetgenreOption(Result.data));
		
    }, [searchString]);
    
    genreOption.map(function (item,i) {
        tempOption.push({"text":item,"value":item})
        return 0
    });
    

    return (
        <div>
			<Form onSubmit={props.SubmitHandler}>
				<Form.Group inline>
					<Form.Field
                        id='SelGenre'
                        name='SelGenre'
        				control={Select}
                        label='Genre'
                        options={tempOption}
                        clearable={true}
                        onChange={props.OnChangeHandler}
      				/>
					<Form.Field
                        id='form-searchStringTitle'
                        name='searchString'
        				control={Input}
						label='Title'
                        style={{width:'300px'}}
                        onChange={props.OnChangeHandler}
      				/>
					 <Button type='submit'  >Submit</Button>
				</Form.Group>
				
			</Form>
        </div>
    )
};

export default MoviesInputSearchSemUI