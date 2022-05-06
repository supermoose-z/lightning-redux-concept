
import { Movie, OmdbMovie } from "./store/models";

async function callOmdbApi(params)
{
    var usp = new URLSearchParams(params);
    var url = `https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&${usp.toString()}`;

    const resp = await fetch(url);
    const json = await resp.json();

    return json;
}

export async function fetchMoviesBySearch(search:string) : Promise<[Movie?]>
{
    const result:any = await callOmdbApi({
        s: search,
        type: 'movie'
    });

    var movies: [Movie?] = [];

    result.Search.sort((a, b) => Math.sign(a.Year - b.Year));

    // convert movies to internal data type
    movies = result.Search.map(m => ({
        id: m.imdbID,
        title: m.Title,
        poster: m.Poster,
        video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    }));

    return movies;
}

export async function fetchMovieById(id:String) : Promise<OmdbMovie>
{
    const result:any = await callOmdbApi({ i: id });

    return result as OmdbMovie;
}