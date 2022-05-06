

import { fetchMovies } from '../store/moviesSlice';
import { ReduxAwareComponent } from './ReduxAwareComponent';
import { MovieList } from './MovieList';
import { CurrentMoviePoster } from './CurrentMoviePoster';

export class MovieBrowser extends ReduxAwareComponent
{
    static _template()
    {
        return {
            Poster: { 
                type: CurrentMoviePoster,
                x: 0,
                y: 0,
                w: 1280,
                h: 720,
            },

            Movies: {
                type: MovieList,
                x: 10,
                y: 10,
                w: 1280,
                h: 400,
                itemWidth: 1280 / 5,
            }
        }
    }

    // don't need to respond to any state changes in this component
    get connectToStore(): boolean {
        return false;
    }

    _setup() 
    {
        this.store.dispatch(fetchMovies());
    }

    _getFocused()
    {
        return this.tag('Movies');
    }
}