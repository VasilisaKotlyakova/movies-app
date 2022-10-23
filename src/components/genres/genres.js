import React, { Component } from 'react';

export const GenresContext = React.createContext();

export default class Genres extends Component {
  render() {
    return (
      <GenresContext.Consumer>
        {(genreList) => {
          const genres = this.props.genreIds.map((genreId) => {
            const genre = genreList.genres.find((genre) => genre.id === genreId);
            return (
              <span key={genreId} className="movie-card__genre">
                {genre.name}
              </span>
            );
          });
          return <div className="movie-card__genres">{genres}</div>;
        }}
      </GenresContext.Consumer>
    );
  }
}
