
import { Img, Router } from "@lightningjs/sdk";
import { ReduxAwareComponent } from "./ReduxAwareComponent";

import { fetchMovieDetails } from "../store/moviesSlice";
import { OmdbMovie } from "../store/models";
import { MovieDetailsPoster } from "./MovieDetailsPoster";
import { MovieDetailsInfo } from "./MovieDetailsInfo";

import { StageSize } from "./const";

export class MovieDetails extends ReduxAwareComponent
{
    movieId: string;

    static _template()
    {
        return {
            BG: {
                visible: false,
                x: 0,
                y: 0,
                w: StageSize.width,
                h: StageSize.height,
                alpha: 0.25,
            },

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
                x: 20,
                y: 20,
                visible: false,
                flex: { direction: 'row' },

                Poster: {
                    type: MovieDetailsPoster,
                    flexItem: {
                        marginRight: 40,
                    }
                },

                Info: {
                    type: MovieDetailsInfo,
                }
            },
        }
    }


    static _states()
    {
        return [
            class LoadingState extends this 
            {
                $enter(event)
                {
                    this.tag('Loading').patch({ visible: true });
                    this.patch({
                        //Loading: { visible: true, },
                        MovieDetails: { visible: false },
                        BG: { visible: false },
                    });
                }
            },

            class DetailsState extends this
            {
                $enter()
                {
                    const movie = this.state.movies.movieDetails as OmdbMovie;
                    let texture = Img(movie.Poster).cover(StageSize.width, StageSize.height);
                    texture.options.type = 'cover'; 
        
                    this.patch({
                        Loading: { visible: false, },
                        MovieDetails: {
                            visible: true, 
                        },
                        BG: {
                            visible: true,
                            texture,
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

        // load movie details when displaying view
        this.store.dispatch(fetchMovieDetails(this.movieId));
    }

    _storeUpdate()
    {
        const state = this.state.movies;

        if (state.movieLoading)
            // @ts-ignore
            this._setState('LoadingState');
        else if (state.movieDetails)
            // @ts-ignore
            this._setState('DetailsState');
    }
 
    _handleBack()
    {
        console.log('back?');
        
        if (Router.getHistory().length == 0)
            Router.navigate('home', {}, null);
        else
            Router.back();
    }

}

