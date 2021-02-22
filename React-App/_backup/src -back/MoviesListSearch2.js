import React from 'react'
import MoviesGenredropdownlistSemUI from "./MoviesGenredropdownlistSemUI";
import { Form, Input,  Button, Select } from 'semantic-ui-react'


const MoviesListSearch2 = props => {

    return (
        <div>
			<form onSubmit={props.SubmitHandler}>
				<table>
					<tbody>
					<tr>
						<td width="18%">
							<MoviesGenredropdownlistSemUI />
						</td>
						<td width="20%">
							Title: <input type="text" id="SearchString" name="SearchString"/>
						</td>
						<td width="62%">
							<input type="submit" value="Filter"/>
						</td>
					</tr>
					</tbody>
				</table>
			</form>

			<Form>
				<Form.Group inline>
					<Form.Field
        				id='form-SelGenre'
        				control={Select}
        				label='Genre'
      				/>
					<Form.Field
        				id='form-searchStringTitle'
        				control={Input}
						label='Title'
						style={{width:'300px'}}
      				/>
					 <Button type='submit'  >Submit</Button>
				</Form.Group>
				
			</Form>
        </div>
    )
};

export default MoviesListSearch2