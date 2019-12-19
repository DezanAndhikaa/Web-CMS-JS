import React from 'react'
import { Select, MenuItem, FormLabel } from '@material-ui/core'
import './DropDownList.scss'

class DropDownList extends React.Component{
    render(){
        return(
            <div className="show-per-page">
                <span>
                    <FormLabel className="label">Show</FormLabel>
                    <Select variant="outlined" className="dropdown-list" labelId="label" id="select">
                        <MenuItem className="dropdown-list" value="0"></MenuItem>
                        <MenuItem className="dropdown-list" value="10">10</MenuItem>
                        <MenuItem className="dropdown-list" value="25">25</MenuItem>
                        <MenuItem className="dropdown-list" value="50">50</MenuItem>
                        <MenuItem className="dropdown-list" value="100">100</MenuItem>
                        <MenuItem className="dropdown-list" value="1000">All</MenuItem>
                    </Select>
                    <FormLabel className="label">entries</FormLabel>
                </span>
            </div>
        )
    }
}

export default DropDownList;