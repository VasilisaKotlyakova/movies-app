import React, { Component } from 'react';

import './app.css';
import 'antd/dist/antd.css';

import { GenresContext } from "../genres/genres";
import { getItem, setItem } from "../services/storage";

import MoviesFilters from "../movies-filters";
import MoviesList from "../movies-list";
import MovieService from '../services';

import { debounce } from 'lodash';

export default class App extends Component {
  movie = new MovieService();

  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      loading: false,
      error: { status: false, text: '' },
      request: '',
      page: { currentPage: null, totalPages: 5 },
      ratedList: getItem('ratedList'),
      filter: 'Search',
      genresList: [],
    };
  }

  componentDidMount() {
    this.getMoviesFromApi = debounce(this.getMoviesFromApi, 1000);
    this.getGenresFromApi();
  }

  onError = (err) => {
    this.setState({ error: { status: true, text: err }, loading: false });
  };

  getMoviesFromApi = (request) => {
    this.setState({ loading: true });
    this.movie.getAllMovies(request, 1).then((moviesList) => {
      this.setState( {movies: this.getMoviesList(moviesList.results), loading: false, error: {status: false, text: ''}, page: {currentPage: 1, totalPages: moviesList['total_pages']}});
    }).catch((err) => this.onError(err.message));
  }

  getGenresFromApi = () => {
    this.movie.getAllGenres().then((genresList) => {
      this.setState({genresList})}).catch((err) => this.onError(err.message));
  }

  getMoviesList = (moviesList) => {
    return moviesList.map(movie => {
      return {
      id: movie.id,
      title: movie.title,
      posterPath: movie['poster_path'],
      voteAverage: movie['vote_average'],
      releaseDate: movie['release_date'],
      overview: movie['overview'],
      genre: movie['genre_ids']
    }});
  };

  onSearch = (request) => {
    if(request === '') {
      this.setState({ request: request, movies: [], loading: false });
    }
    else {
      this.setState({ request: request, loading: true });
      this.getMoviesFromApi(request, this.state.page.currentPage);
    }
  };

  onPageChange = (pageNumber) => {
    this.setState({ loading: true });
    this.movie.getAllMovies(this.state.request, pageNumber).then((moviesList) => {
      this.setState( {movies: this.getMoviesList(moviesList.results), loading: false, error: {status: false, text: ''}, page: {currentPage: pageNumber, totalPages: this.state.page.totalPages}} );
    }).catch((err) => this.onError(err.message));
  };

  onAddRateList = (movie, rate) => {
    const newRateMovie = { ...movie, rate };
    this.setState(state => {
      if(state.ratedList === null || !state.ratedList.length) {
        setItem('ratedList', [newRateMovie]);
        return { ratedList: getItem('ratedList') };
      }
      const elem = state.ratedList.find((el) => (el.id === movie.id));
      const idx = state.ratedList.indexOf(elem);
      if(idx >= 0 && rate == 0) {
        setItem('ratedList', [...state.ratedList.slice(0, idx),...state.ratedList.slice(idx + 1)]);
        return {ratedList: getItem('ratedList')};
      }
      if(idx >= 0 && rate > 0) {
        setItem('ratedList', [...state.ratedList.slice(0, idx), {...state.ratedList[idx], rate},...state.ratedList.slice(idx+1)]);
        return {ratedList: getItem('ratedList')};
      }
      setItem('ratedList', [...state.ratedList, newRateMovie]);
      return {ratedList: getItem('ratedList')};
    });
  };

  onFilterChange = (filter) => {
    this.setState({filter});
  };
  render() {
    const visibleList = this.state.filter === 'Rated' ? this.state.ratedList : this.state.movies;
    return (
      <GenresContext.Provider value={this.state.genresList}>
        <div className="container">
          <MoviesFilters onFilterChange={this.onFilterChange} onSearch={this.onSearch} />
          <MoviesList filter={this.state.filter} page={this.state.page} onPageChange={this.onPageChange} onAddRateList={this.onAddRateList} movies={visibleList} loading={this.state.loading} error={this.state.error} request={this.state.request}/>
        </div>
      </GenresContext.Provider>
    );
  }
}
