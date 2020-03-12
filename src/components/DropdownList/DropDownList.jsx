import React from 'react'
import { Select, MenuItem, FormLabel } from '@material-ui/core'
import './DropDownList.scss'

class DropDownList extends React.Component{
    state = {
        pagesize: 0,
    }

    handleChange = async(event) => {
        this.setState(
            { pagesize : event.target.value},
            () => this.props.handleClickShowPerPage(this.state.pagesize)
            );
      }
	render(){
		return(
			<div className="show-per-page">
				<span>
					<FormLabel className="label">Show</FormLabel>
					<Select variant="outlined" 
						className="dropdown-list" 
                        labelId="label" id="select" 
                        defaultValue={10}
                        onChange={this.handleChange}
					>
						<MenuItem className="dropdown-list" value="5">5</MenuItem>
						<MenuItem className="dropdown-list" value="10">10</MenuItem>
						<MenuItem className="dropdown-list" value="15">15</MenuItem>
						<MenuItem className="dropdown-list" value="20">20</MenuItem>
						<MenuItem className="dropdown-list" value="25">25</MenuItem>
					</Select>
					<FormLabel className="label">entries</FormLabel>
				</span>
			</div>
		)
	}
}

export default DropDownList;