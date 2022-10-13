import React from 'react';
import { Tabs } from 'antd';

import './movies-filters.css';
import MoviesSearch from "../movies-search";

function MoviesFilters({onSearch, onFilterChange}) {
  return (
      <Tabs centered={true} destroyInactiveTabPane={true} onChange={key => onFilterChange(key)}>
        <Tabs.TabPane tab="Search" key="Search">
          <MoviesSearch onSearch={onSearch} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Rated" key="Rated">
        </Tabs.TabPane>
      </Tabs>
  );
}

export default MoviesFilters;
