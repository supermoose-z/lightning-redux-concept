
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchMovieById, fetchMoviesBySearch } from "../api";
import { Movie } from "./models";

// async thunk to retrieve movie data from Supabase
export const fetchMovies = createAsyncThunk(
    'movies/fetchMovieList',
    async (thunkAPI) => ({ movies: await fetchMoviesBySearch('Star Wars') }),
);

// retrieve movie details
export const fetchMovieDetails = createAsyncThunk(
    'movies/fetchMovieDetails',
    async (id:string, thunkAPI) => await fetchMovieById(id),
);

// initial state shape
const initialState = {
    movieList: [],
    currentMovie: null,
    movieDetails: null,
    movieLoading: false,
};

// setup slice
export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setCurrentMovie(state, { payload }) {
            state.currentMovie = payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movieList = action.payload.movies;

            // make first movie in list the selected one
            if (state.movieList.length > 0)
                state.currentMovie = state.movieList[0];
            else
                state.currentMovie = null;
        });

        builder.addCase(fetchMovieDetails.pending, (state, action) => {
            state.movieLoading = true;
        });

        builder.addCase(fetchMovieDetails.fulfilled, (state, action) => {
            state.movieDetails = action.payload;
            state.movieLoading = false;
        });
    }
});

export const { setCurrentMovie }  = moviesSlice.actions;

export default moviesSlice.reducer;