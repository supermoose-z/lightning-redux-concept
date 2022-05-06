
export class Movie
{
    id: string;
    title: string;
    poster: string;
    video: string;
    thumbnail: string;
}

export class OmdbMovie
{
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Metascore: string;
    imdbRating: string;
    imdbVotes: string;
    imdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;
    Ratings: [
        {
            Source: string;
            Value: string;
        }
    ]
}