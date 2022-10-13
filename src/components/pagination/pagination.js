import React from 'react';
import { Pagination } from 'antd';
import './pagination.css';

function PaginationOnFooter({page, onPageChange}) {
  return (
    <Pagination
      className="footer"
      current={page.currentPage}
      total={page.totalPages}
      onChange={onPageChange}
    />
  );
}

export default PaginationOnFooter;
