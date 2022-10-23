import React from 'react';
import { Spin, Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import './movies-list.css';
import MoviesListItem from "../movies-list-item";
import PaginationOnFooter from "../pagination";

function MoviesList ({movies, loading, error, request, filter, onAddRateList, page, onPageChange}) {

  if(loading) {
    return (
      <div className="movies">
        <Spin className="spin" />
      </div>
    );
  }

  if(error.status) {
    return (
      <div className="movies">
        <Alert className="message-info" message="Error" description={"Упс! Что-то пошло не так."} type="error"></Alert>
      </div>
    );
  }

  if(!request && filter === 'Search' || movies === null) {
    return <div className="movies"></div>;
  }

  const list = movies.map((movie) => <MoviesListItem key={movie.id} filter={filter} movies={movie} onAddRateList={onAddRateList}/>);
  if(list.length === 0 && request.length !== 0) {
    return (
      <div className="movies">
        <Alert className="message-info" description={"Поиск не дал результатов."} type="warning"></Alert>
      </div>
    );
  }

  return (
    <div className="content">
        <Online>
          <div className="movies">
            {list}
          </div>
          <PaginationOnFooter page={page} onPageChange={(pageNumber) => onPageChange(pageNumber)} />
        </Online>
        <Offline>
          <Alert className="message-info" message="Error" type="error" description={"Сейчас вы не в сети. Проверьте подключение."}></Alert>
        </Offline>
    </div>
  );
}

export default MoviesList;
