
import Lightning from '@lightningjs/core';
import { Img, Utils, Colors } from "@lightningjs/sdk";
import { Movie, OmdbMovie } from '../store/models';

import { ReduxAwareComponent } from './ReduxAwareComponent';
import { StateComponent } from './StateComponent';
import { StageSize } from './const';

export class CurrentMoviePoster extends StateComponent
{
    titleAnim: any;
    posterAnim: any;

    static _template()
    {
        return {
            // used to fade out over
            BgImage: {
                //visible: false,
                x: 0,
                y: 0,
                w: w => w,
                h: h => h,
            },

            // current poster image
            PosterImage: {
                alpha: 0,
                x: 0,
                y: 0,
                w: w => w,
                h: h => h,
            },

            Cover: {
                color: 0x7F000000,
                rect: true,
                x: 0,
                y: 0,
                w: w => w,
                h: h => h,
            },

            Title: {
                alpha: 0,
				x: 40,
				y: h => h - 80,
				text: {
					fontSize: 36,
                    shadow: true,
					text: '<movie name>',
					textColor: 0xFFFFFFFF,
				},
            }
        }
    }

    _updatePoster(movie: Movie)
    {
        var poster = this.tag('PosterImage');
        var title = this.tag('Title');
        //var movie = this.$store.state.currentMovie;

        // if the incoming movie is null
        if (movie == null)
        {
            // hide the poster
            poster.patch({ visible: false });
            title.patch({ visible: false });
        }
        else 
        {
            let texture = Img(movie.poster).cover(StageSize.width, StageSize.height);
            texture.options.type = 'cover'; 

            // swap bg textures to enable cross fade effect
            this.tag('BgImage').patch({
                texture: poster.texture,
            });

            // update poster image
            poster.patch({ texture });
            this.posterAnim.stop();
            this.posterAnim.start();

            // update title
            title.patch({ 
                text: { text: movie.title },
            });

            this.titleAnim.finish();
            this.titleAnim.start();
        }
    }

    _init()
    {
        this.posterAnim = this.tag('PosterImage').animation({
            duration: 0.25,
            repeat: 0,
            stopMethod: 'forward',
            actions: [
                {
                    p: 'alpha',
                    v: { 0: 0, 1: 1 },
                }
            ]
        });

        this.titleAnim = this.tag('Title').animation({
            duration: 0.7,
            repeat: 0,
            stopMethod: 'forward',
            actions: [
                {
                    p: 'alpha',
                    v: { 0: 0, 1: 1 },
                },
                {
                    p: 'x',
                    v: {
                        0: 80,
                        1: 40
                    }
                }
            ]
        });

        this.subscribe(
            (state) => state.currentMovie,
            (movie) => this._updatePoster(movie)
        );
    }

}