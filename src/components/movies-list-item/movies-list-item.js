import React, { Component } from 'react';
import Genres from "../genres/genres";

import './movies-list-item.css';
import { format } from 'date-fns';
import { Rate } from 'antd';

export default class MoviesListItem extends Component {
  get formattedReleaseDate() {
    const dateString = this.props.movies.releaseDate;
    if (!dateString) return undefined;
    const date = new Date(dateString);
    return format(date, 'MMMM d, Y');
  };

  get shortOverview() {
    const maxLength = 28;
    const shortOverview = this.props.movies.overview.split(' ');
    if (shortOverview.length >= maxLength) {
      shortOverview.length = maxLength;
      shortOverview.push('...');
    }
    return shortOverview.join(' ');
  }

  get ratingColor() {
    const voteAverage = this.props.movies.voteAverage;
    if (voteAverage >= 7) return '#66e900';
    else if (voteAverage >= 5) return '#e9d100';
    else if (voteAverage >= 3) return '#e97e00';
    else if (voteAverage >= 0) return '#e90000';
    return undefined;
  }

   render()
   {
    return (
      <div className="movie__card movie-card">
        <img src={`https://image.tmdb.org/t/p/w200${this.props.movies.posterPath}`}></img>
        <div className="movie-card__info">
          <div className="movie-card__head">
            <h2 className="movie-card__title">{this.props.movies.title}</h2>
            <div className="movie-card__head-rate" style={{ borderColor: this.ratingColor }}>
              {this.props.movies.voteAverage}
            </div>
          </div>
          <span className="movie-card__release-date">{this.formattedReleaseDate}</span>
          <Genres genreIds={this.props.movies.genre} />
          <div className="movie-card__body-wrapper">
            <span className="movie-card__description">{this.shortOverview}</span>
          </div>
          <Rate allowHalf count={10} onChange={(rate) => this.props.onAddRateList(this.props.movies.id, this.props.movies.title, this.props.movies.posterPath, rate, this.props.movies.voteAverage, this.props.movies.releaseDate, this.props.movies.overview, this.props.movies.genre)}/>
        </div>
      </div>
    );
  }

}

