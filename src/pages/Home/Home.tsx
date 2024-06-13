import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Filters from '../../components/Filters/Filters';
import MovieList from '../../components/MovieList/MovieList';
import { fetchMovies, setPage } from '../../store/movieSlice';
import { AppDispatch, RootState } from '../../store/store';
import { ROUTES } from '../../utils/routes';

const Home = () => {
	const dispatch = useDispatch<AppDispatch>();
	const {
		movies,
		isLoading,
		error,
		totalPages,
		currentPage,
		selectedGenres,
		ratingRange,
		yearRange,
		favourites,
	} = useSelector((s: RootState) => s.movie);
	const [pageSet, setPageSet] = useState(0);

	useEffect(() => {
		dispatch(
			fetchMovies({
				page: currentPage,
				genres: selectedGenres,
				ratingRange,
				yearRange,
			})
		);
	}, [currentPage, dispatch]);

	const handlePageChange = (page: number) => {
		dispatch(setPage(page));
	};
	const handleNextPageSet = () => {
	
		if ((pageSet + 1) * 15 < totalPages) {
			setPageSet(pageSet + 1);
		}
	};

	const handlePreviousPageSet = () => {

		if (pageSet > 0) {
			setPageSet(pageSet - 1);
		}
	};
	const handleButtonClick = () => {
		dispatch(
			fetchMovies({
				page: currentPage,
				genres: selectedGenres,
				ratingRange,
				yearRange,
			})
		);
	};
	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div>
			<h1 className='text-4xl text-center my-8'>Список фильмов и сериалов</h1>

			<Filters onClick={handleButtonClick} />
			<Link to={ROUTES.FAVOURITES}>
				<h1 className='text-2xl text-left mb-3'>
					Избранное {favourites.length}
				</h1>
			</Link>
			<MovieList movies={movies} />

			<div className='mt-4 flex justify-center text-black font-bold'>
				{pageSet > 0 && (
					<button
						onClick={handlePreviousPageSet}
						className='px-4 py-2 mx-1 bg-gray-200'
					>
						Предыдущий
					</button>
				)}
				{Array.from(
					{ length: Math.min(15, totalPages - pageSet * 15) },
					(_, index) => (
						<button
							key={index}
							className={`px-4 py-2 mx-1 ${
								index + 1 === currentPage
									? 'bg-blue-500 text-white'
									: 'bg-gray-200'
							}`}
							onClick={() => handlePageChange(index + 1 + pageSet * 15)}
						>
							{index + 1 + pageSet * 15}
						</button>
					)
				)}
				{(pageSet + 1) * 15 < totalPages && (
					<button
						onClick={handleNextPageSet}
						className='px-4 py-2 mx-1 bg-gray-200'
					>
						Следующий
					</button>
				)}
			</div>
		</div>
	);
};

export default Home;
