import React from 'react'
import { Select, MenuItem, FormLabel, Menu } from '@material-ui/core'
import './DropDownList.scss'

class DropDownList extends React.Component{
    state = {
        pagesize: 0,
    }
    // handleClick = async(prevState, value) => {
        // const { myValue } = event.currentTarget.dataset
        // this.setState({pagesize : numberOfPages})
        // await this.setState({ pagesize : value.target.value});
        // await this.props.clearSelectedSalesPlans(), 
        // await this.props.clearSelectedServicePlans(),
        //     console.log('this is pagenumber size data', prevState.target.value)
        //     console.log('this is pagenumber size data', this.state.pagesize)

        // this.props.onPageSize(value)
        // await this.props.clearSelectedServicePlans();
        // await this.props.clearSelectedSalesPlans();
        // await this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageSize: this.state.pagesize})
    // }

    handleChange = async(event) => {
        this.setState(
            { pagesize : event.target.value},
            // () => this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageSize: this.state.pagesize}), 
            () => this.props.handleClickShowPerPage(this.state.pagesize)
            );
        // await this.handleClick(event.target.value)
        // this.handleClick(event.target.value)
        // await this.props.updateSalesParameter({ ...this.props.salesParameter.dataFilter, PageSize: this.state.pagesize})
        // await this.props.updateServiceParameter({ ...this.props.serviceParameter.dataFilter, PageSize: this.state.pagesize})
      }
	render(){
		return(
			<div className="show-per-page">
				<span>
					<FormLabel className="label">Show</FormLabel>
					<Select variant="outlined" 
						className="dropdown-list" 
                        labelId="label" id="select" 
                        // value={this.state.pagesize}
                        defaultValue={2}
                        onChange={this.handleChange}
                        // onClick={this.handleClick}
					>
						<MenuItem className="dropdown-list" value="2">2</MenuItem>
						<MenuItem className="dropdown-list" value="4">4</MenuItem>
						<MenuItem className="dropdown-list" value="6">6</MenuItem>
						<MenuItem className="dropdown-list" value="100">100</MenuItem>
						<MenuItem className="dropdown-list" value="100000">All</MenuItem>
					</Select>
					<FormLabel className="label">entries</FormLabel>
				</span>
			</div>
		)
	}
}

export default DropDownList;