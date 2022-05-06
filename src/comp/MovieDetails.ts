
import Lightning from "@lightningjs/core";
import { ReduxAwareComponent } from "./ReduxAwareComponent";

import { fetchMovieDetails } from "../store/moviesSlice";
import { OmdbMovie } from "../store/models";

export class MovieDetails extends ReduxAwareComponent
{
    movieId: string;

    static _template()
    {
        return {
            Loading: {
                x: 10,
                y: 10,
                visible: false,
                text: {
                    fontSize: 24,
                    text: 'Loading...',
                    textColor: 0xFFFFFFFF,
                }
            },

            MovieDetails: {
                x: 10,
                y: 10,
                visible: false,
                text: {
                    fontSize: 24,
                    text: '',
                    textColor: 0xFFFFFFFF,
                }
            }
        }
    }


    static _states()
    {
        return [
            class LoadingState extends this 
            {
                $enter(event)
                {
                    console.log('enter???');

                    this.tag('Loading').patch({ visible: true });
                    this.patch({
                        //Loading: { visible: true, },
                        MovieDetails: { visible: false, }
                    });
                }
            },

            class DetailsState extends this
            {
                $enter()
                {
                    const movie = this.state.movies.movieDetails as OmdbMovie;

                    this.patch({
                        Loading: { visible: false, },
                        MovieDetails: {
                            visible: true, 
                            text: {
                                text: `Movie loaded: ${movie.Title}`,
                            }
                        }
                    });
                }
            }
        ]
    }

    set params(args)
    {
        this.movieId = args.id;
    }

    _init()
    {
        // @ts-ignore
        this._setState('LoadingState');
    }

    _enable()
    {
        super._enable();

        this.store.dispatch(fetchMovieDetails(this.movieId));
    }

    _storeUpdate()
    {
        const state = this.state.movies;

        if (state.movieDetails)
            // @ts-ignore
            this._setState('DetailsState');
        else
            // @ts-ignore
            this._setState('LoadingState');
    }
    
}

