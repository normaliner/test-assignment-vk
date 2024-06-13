import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import { RootState } from '../../store/store';

const Favourites = () => {
	const favourites = useSelector((s: RootState) => s.movie.favourites);
	const navigate = useNavigate();
	return (
		<div className='mx-auto'>
			<h1 className='text-4xl text-center my-8'> Избранные фильмы</h1>
			{favourites.length === 0 ? (
				<p className='text-2xl'>Вы не добавили ни одного фильма в избранное</p>
			) : (
				<MovieList movies={favourites} />
			)}
			<button
				className='mt-8 text-black text-2xl bg-white px-4 py-2 rounded  hover:bg-transparent hover:text-white'
				onClick={() => navigate('/')}
			>
				На главную
			</button>
		</div>
	);
};

export default Favourites;
