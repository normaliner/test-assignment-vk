import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { IMovie } from '../interfaces/movie';
import { API_TOKEN, API_URL } from '../utils/const';

interface IInitialState {
	movies: IMovie[];
	movieDetail: IMovie | null;
	favourites: IMovie[];
	totalPages: number;
	currentPage: number;
	selectedGenres: string[];
	ratingRange: [number, number];
	yearRange: [number, number];
	isLoading: boolean;
	error: string | null;
}

const initialState: IInitialState = {
	movies: [],
	movieDetail: null,
	favourites: JSON.parse(localStorage.getItem('favorites') || '[]'),
	totalPages: 0,
	currentPage: 1,
	selectedGenres: [],
	ratingRange: [0, 10],
	yearRange: [1990, new Date().getFullYear()],
	isLoading: false,
	error: null,
};

export const fetchMovies = createAsyncThunk(
	'movies/fetchMovies',
	async (params: {
		page: number;
		genres: string[];
		ratingRange: [number, number];
		yearRange: [number, number];
	}) => {
		try {
			const { page, genres, ratingRange, yearRange } = params;
			const queryParams = new URLSearchParams();
			
			queryParams.append('page', page.toString());
			queryParams.append('limit', '50');
			genres.forEach(genre => queryParams.append('genres.name', genre));
			queryParams.append('rating.imdb', `${ratingRange[0]}-${ratingRange[1]}`);
			queryParams.append('year', `${yearRange[0]}-${yearRange[1]}`);

			const res = await axios.get(`${API_URL}?${queryParams.toString()}`, {
				headers: {
					'X-API-KEY': API_TOKEN,
				},
			});
			return {
				movies: res.data.docs,
				totalPages: res.data.pages,
				currentPage: page,
			};
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			} else {
				throw new Error('Server invalid');
			}
		}
	}
);

export const fetchMovieDetail = createAsyncThunk(
	'movies/fetchMovieDetail',
	async (id: number) => {
		try {
			const res = await axios.get(`${API_URL}/${id}`, {
				headers: {
					'X-API-KEY': API_TOKEN,
				},
			});
			return res.data;
		} catch (e) {
			if (e instanceof AxiosError) {
				throw new Error(e.response?.data.message);
			} else {
				throw new Error('Server invalid');
			}
		}
	}
);
const movieSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		setPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload;
		},
		setGenres: (state, action: PayloadAction<string[]>) => {
			state.selectedGenres = action.payload;
		},
		setRatingRange: (state, action: PayloadAction<[number, number]>) => {
			state.ratingRange = action.payload;
		},
		setYearRange: (state, action: PayloadAction<[number, number]>) => {
			state.yearRange = action.payload;
		},
		addFavourites: (state, action: PayloadAction<IMovie>) => {
			state.favourites = [...state.favourites, action.payload];
			localStorage.setItem('favorites', JSON.stringify(state.favourites));
		},
		removeFavourites: (state, action: PayloadAction<number>) => {
			state.favourites = state.favourites.filter(
				fav => fav.id !== action.payload
			);
			localStorage.setItem('favorites', JSON.stringify(state.favourites));
		},
	},
	extraReducers: builder => {
		builder.addCase(fetchMovies.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(fetchMovies.fulfilled, (state, action) => {
			state.isLoading = false;
			state.movies = action.payload.movies;
			state.totalPages = action.payload.totalPages;
			state.currentPage = action.payload.currentPage;
		});
		builder.addCase(fetchMovies.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message || null;
		});
		builder.addCase(fetchMovieDetail.pending, state => {
			state.isLoading = true;
		});
		builder.addCase(fetchMovieDetail.fulfilled, (state, action) => {
			state.isLoading = false;
			state.movieDetail = action.payload;
		});
		builder.addCase(fetchMovieDetail.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.error.message || null;
		});
	},
});

export default movieSlice.reducer;
export const {
	setPage,
	setGenres,
	setRatingRange,
	setYearRange,
	addFavourites,
	removeFavourites,
} = movieSlice.actions;
