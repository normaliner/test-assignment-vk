import { FC } from 'react';
import { IMovie } from '../../interfaces/movie';
import MovieItem from '../MovieItem/MovieItem';

interface MovieListProps {
	movies: IMovie[];
}

const MovieList: FC<MovieListProps> = ({ movies }) => {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
			{movies.map(movie => (
				<MovieItem key={movie.id} movie={movie} />
			))}
		</div>
	);
};

export default MovieList;
