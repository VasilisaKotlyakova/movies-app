export default class MovieService {

  _baseApi = 'https://api.themoviedb.org/3/';
  _keyApi = '?api_key=1ca76add8b1d189aa142e71774f55770';

  async getAllMovies(request, pageNumber) {
    const res = await fetch(`${this._baseApi}search/movie${this._keyApi}&language=en-US&query=${request}&page=${pageNumber}&include_adult=false`);

    if(!res.ok) {
     throw new Error(`${this._baseApi}search/movie${this._keyApi}&language=en-US&query=${request}&page=${pageNumber}&include_adult=false`);
    }

    const result = await res.json();
    return result;
  };

  async getAllGenres() {
    const res = await fetch(`${this._baseApi}genre/movie/list${this._keyApi}&language=en-US`);

    if(!res.ok) {
      throw new Error(`Could not fetch ${this._baseApi}genre/movie/list${this._keyApi}&language=en-US`);
    }

    const result = await res.json();
    return result;
  };

}

