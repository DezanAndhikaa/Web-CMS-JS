import React from 'react';
import { InputBase, Paper } from '@material-ui/core';
import { SearchIcon } from 'assets/icons';
import './SearchInput.scss';

export default class SearchInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleKeyUp = (event) => {
    this.setState({ value: event.target.value });
    setTimeout(() => {
      this.props.handleSearch(this.state.value)
    }, 1000)
  }

  render() {
    const info = (this.props.displayMode === 'web' ? this.props.webInfo : this.props.generalInfo) || 'Search';
    return (
      <Paper className={this.props.idTab === "Status" ? "search-input-status" : this.props.idSearch === "Rev" ? "search-input-rev" : "search-input"} elevation={1}>
        <img src={SearchIcon} alt="" className= "search-icon" />
        <InputBase
          className= "search-text"
          placeholder= {info}
          onKeyUp={this.handleKeyUp}
        />
      </Paper>
    );
  }
}
