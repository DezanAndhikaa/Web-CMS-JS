import React from 'react';
import './FilterByLifetime.scss';
import CloseButton from '../../components/ActionButton/CloseButton/CloseButton';
import { Button } from '@material-ui/core';

class FilterByLifetime extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value1: '',
            value2: ''
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    isDisabled() { return this.state.value1 === '' || this.state.value2 === '' }

    render() {
        return (
            <div className="assign-lifetime-modal">
                <div className="top-row">
                    <div className="ut-underline" />
                    <p className="select-input-title">{this.props.title}</p>
                    <CloseButton idBtnClose="NonConfirmModal" onClose={this.props.onClosed} />
                </div>
                <div className="teks-middle">
                    <label className="teks-left">Min</label>
                    <label className="teks-right">Max</label>
                </div>
                <div className="top-midel">
                    <input type="number" className="input-left" name="value1" onChange={this.handleChange} value={this.state.value1}></input>
                    <input type="number" className="input-right" name="value2" onChange={this.handleChange} value={this.state.value2}></input>
                </div>

                <div className="bottom-rows">
                    <Button 
                        disabled={this.isDisabled()}
                        className={this.isDisabled() ? "btn-search-disabled" : "btn-search"}
                        onClick={() => { this.props.onFilter(this.state.value1, this.state.value2); this.props.onClosed() }} 
                    >
                        {this.props.titles === "Lifetime Comp" ? "Search Lifetime" : "Search SMR"}
                    </Button>
                </div>
            </div>
        )
    }
}

export default FilterByLifetime