import React from 'react'
import { Select, MenuItem, FormHelperText } from '@material-ui/core'
import './DropDownList.scss'

class DropDownList extends React.Component{
    render(){
        return(
            <div>
                <Select className="dropdowns" labelId="label" id="select">
                    <MenuItem value="0"></MenuItem>
                    <MenuItem value="10">EXKM21034</MenuItem>
                    <MenuItem value="20">EXKM21035</MenuItem>
                    <MenuItem value="20">EXKM21036</MenuItem>
                    <MenuItem value="20">EXKM21037</MenuItem>
                    <MenuItem value="20">EXKM21038</MenuItem>
                </Select>
                <FormHelperText>* Don't Add Space Before and After Unit Code</FormHelperText>
            </div>
        )
    }
}

export default DropDownList;