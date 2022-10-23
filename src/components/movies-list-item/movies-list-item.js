import React, { Component } from 'react';
import { format } from 'date-fns';
import { Rate } from 'antd';

import Genres from '../genres/genres';
import './movies-list-item.css';

const green = '#66e900';
const yellow = '#e9d100';
const orange = '#e97e00';
const red = '#e90000';

export default class MoviesListItem extends Component {

  get formattedReleaseDate() {
    const dateString = this.props.movies.releaseDate;
    if (!dateString) return undefined;
    const date = new Date(dateString);
    return format(date, 'MMMM d, Y');
  }

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
    if (voteAverage >= 7) return green;
    else if (voteAverage >= 5) return yellow;
    else if (voteAverage >= 3) return orange;
    else if (voteAverage >= 0) return red;
    return undefined;
  }

   render()
   {
     let rated;
     if(this.props.filter === 'Rated'){
       rated = <Rate allowHalf value={this.props.movies.rate} count={10} onChange={(rate) => this.props.onAddRateList(this.props.movies, rate)}/>;
     }
     else {
       rated = <Rate allowHalf count={10} onChange={(rate) => this.props.onAddRateList(this.props.movies, rate)}/>
     }
    return (
      <div className="movie__card movie-card">
        <img src={`https://image.tmdb.org/t/p/w200${this.props.movies.posterPath}`}
             onError={e => e.target.src ="https://www.brasscraft.com/wp-content/uploads/2017/01/no-image-available.png"}></img>
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
          {rated}
        </div>
      </div>
    );
  }

}

