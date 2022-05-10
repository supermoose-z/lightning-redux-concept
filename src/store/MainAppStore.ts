
import { produce } from 'immer';

import { AbstractAppStore } from "../abstract-store";
import { Movie, OmdbMovie } from './models';
import { fetchMovieById, fetchMoviesBySearch } from '../api';

export interface AppState
{
    movieList: [Movie?];
    currentMovie: Movie;
    movieDetails: OmdbMovie;
    movieLoading: boolean;
}

export class MainAppStore extends AbstractAppStore<AppState>
{
    _state: AppState;

    constructor(initial: AppState)
    {
        super();

        this._state = initial;
    }

    get state(): AppState
    {
        return this._state;
    }

    _updateState(callback: (draft:AppState) => void)
    {
        this._state = produce(this._state, callback);
        this.notifyStateUpdated();
    }

    async fetchMovieList()
    {
        var result = await fetchMoviesBySearch('Star Wars');
        this._updateState(draft => { draft.movieList = result });
    }

    async fetchMovieDetails(id: String)
    {
        this._updateState(draft => { draft.movieLoading = true });

        try
        {
            var result = await fetchMovieById(id);
            this._updateState(draft => { draft.movieDetails = result });
        }
        finally
        {
            this._updateState(draft => { draft.movieLoading = false });
        }
    }

    setCurrentMovie(movie: Movie)
    {
        this._updateState(draft => { draft.currentMovie = movie });
    }
}
