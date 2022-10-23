import React, { Component } from 'react';
import './movies-search.css';
import { Input } from 'antd';

export default class MoviesSearch extends Component {
render() {
   return (
    <Input
       className="header__search"
       placeholder="Type to search.."
       onChange={(e) => this.props.onSearch(e.target.value.trim())}>
    </Input>
   );
 }
}

