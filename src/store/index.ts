
import { configureStore } from "@reduxjs/toolkit";
import { MainAppStore } from './MainAppStore';

import moviesReducer from "./moviesSlice";

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
    }
});

export const appStore = new MainAppStore({
    movieList: [],
    movieDetails: null,
    movieLoading: false,
    currentMovie: null,
});

