import React from 'react';
import { Spin, Alert } from 'antd';
import { Offline, Online } from 'react-detect-offline';

import './movies-list.css';
import MoviesListItem from "../movies-list-item";

function MoviesList ({movies, loading, error, request, onAddRateList}) {

  const list = movies.map((movie) => <MoviesListItem key={movie.id} movies={movie} onAddRateList={onAddRateList}/>);

  switch(true) {
    case loading:  return (
      <div className="movies">
        <Spin className="spin" />
      </div>
    );
    case error.status: return (
      <div className="movies">
        <Alert message="Error" description={"Упс! Что-то пошло не так."} type="error"></Alert>
      </div>
    );
    case (list.length === 0 && request.length !== 0): return (
      <div className="movies">
        <Alert description={"Поиск не дал результатов."} type="warning"></Alert>
      </div>
    );
    case !request: return <div className="movies"></div>;
  }

  return (
    <div className="content">
        <Online>
          <div className="movies">
            {list}
          </div>
        </Online>
        <Offline>
          <Alert message="Error" type="error" description={"Сейчас вы не в сети. Проверьте подключение."}></Alert>
        </Offline>
    </div>
  );
}

export default MoviesList;
