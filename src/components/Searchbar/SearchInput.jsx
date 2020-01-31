

import React from 'react';
import { InputBase, Paper } from '@material-ui/core';
import { SearchIcon } from '../../assets/icons';
import './SearchInput.scss';

export default class SearchInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleKeyUp = (event) => {
    if (this.props.whatTabIsRendered === true) {
      this.setState({ value: event.target.value });
      if (event.keyCode === 13) {
        this.props.onSalesSearch(this.state.value);
      } else {
        setTimeout(() => {
          this.props.onSalesSearch(this.state.value);
        }, 1000);
      }
    }else{
      this.setState({ value: event.target.value });
      if (event.keyCode === 13) {
        this.props.onServiceSearch(this.state.value);
      } else {
        setTimeout(() => {
          this.props.onServiceSearch(this.state.value);
        }, 1000);
      }
    }
  }

  render() {
    const info = (this.props.displayMode === 'web' ? this.props.webInfo : this.props.generalInfo) || 'Search';
    return (
      <Paper className={this.props.className || 'search-input'} elevation={1}>
        <img src={SearchIcon} alt="" className="search-icon" />
        <InputBase
          className="search-text"
          placeholder={info}
          onKeyUp={this.handleKeyUp}
        />
      </Paper>
    );
  }
}
