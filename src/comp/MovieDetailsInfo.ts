
import { OmdbMovie } from '../store/models';
import { ReduxAwareComponent } from './ReduxAwareComponent';

export class MovieDetailsInfo extends ReduxAwareComponent
{
    static _template()
    {
        return {
            flex: {
                direction: 'column',
            },

            Title: {
                text: {
                    fontSize: 30,
                    textColor: 0xFFFFFFFF,
                }
            },

            ReleaseInfo: {
                text: {
                    fontSize: 24,
                    textColor: 0xFFCCCCCC,
                },
                flexItem: {
                    marginBottom: 10,
                }
            },

            Plot: {
                text: {
                    fontSize: 20,
                    lineHeight: 20 * 1.5,
                    textColor: 0xFFCCCCCC,
                    wordWrapWidth: 800,
                }
            },
        }
    }

    get connectToStore(): boolean {
        return false;
    }

    _enable()
    {
        var movie: OmdbMovie;

        super._enable();

        movie = this.state.movies.movieDetails;

        this._setItemText('Title', movie.Title);
        this._setItemText('ReleaseInfo', `${movie.Runtime}, Released: ${movie.Released}`);
        this._setItemText('Plot', movie.Plot);
    }

    _setItemText(tag, text)
    {
        this.tag(tag).patch({
            text: { text }
        });
    }

}
