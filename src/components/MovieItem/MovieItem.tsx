import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IMovie } from '../../interfaces/movie';
import { addFavourites, removeFavourites } from '../../store/movieSlice';
import { RootState } from '../../store/store';

interface MovieCardProps {
	movie: IMovie;
}

const MovieItem: FC<MovieCardProps> = ({ movie }) => {
	const dispatch = useDispatch();
	const favourites = useSelector((s: RootState) => s.movie.favourites);
	const isFavorite = favourites.some(fav => fav.id === movie.id);
	const handleToogleClick = () => {
		if (isFavorite) {
			dispatch(removeFavourites(movie.id));
		} else {
			dispatch(addFavourites(movie));
		}
	};

	return (
		<div className='p-4 rounded shadow border-2 border-b-cyan-50 flex flex-col justify-between'>
			<Link to={`/movie/${movie.id}`}>
				<img
					src={movie.poster?.previewUrl}
					alt={movie.name}
					className='w-full h-64 object-cover rounded'
				/>
				<h3 className='text-xl mt-2'>{movie.name}</h3>
				<p>{movie.year}</p>
				<p>Rating: {movie.rating.imdb}</p>
			</Link>
			<button className='mt-4 text-black text-2xl bg-white px-4 py-2 rounded  hover:bg-transparent hover:text-white' onClick={handleToogleClick}>
				{isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
			</button>
		</div>
	);
};

export default MovieItem;
