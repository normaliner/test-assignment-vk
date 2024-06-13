import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { useEffect } from 'react'
import { fetchMovieDetail } from '../../store/movieSlice'

const MovieDetail = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate()
	const { isLoading, movieDetail, error } = useSelector(
		(s: RootState) => s.movie
	);

	useEffect(() => {
		dispatch(fetchMovieDetail(Number(id)));
	}, [dispatch, id]);

	return (
		<div>
			{isLoading && <div>Loading...</div>}
			{error && <div>Error: {error}</div>}
			{!isLoading && !error && (
				<div className='p-4'>
					{movieDetail ? (
						<div className='flex gap-4'>
							<img
								src={movieDetail.poster?.url}
								alt={movieDetail.name}
								className='max-w-xl'
							/>
							<div className='flex flex-col gap-3 items-baseline text-left'>
								<h2 className='text-2xl font-bold'>{movieDetail.name}</h2>
								<p className='text-white text-left font-semibold' >{movieDetail.description}</p>
								<p className='text-lg mt-2'>
									Рейтинг ИМБД: {movieDetail.rating.imdb}
								</p>
								<p className='text-lg mt-2'>
									Дата релиза:
									{new Date(movieDetail.year).toLocaleDateString()}
								</p>
								<div className='mt-2'>
									<h3 className='font-semibold mb-1'>Genres:</h3>

									<ul className='ml-5 '>
										{movieDetail.genres.map(genre => (
											<li className=' list-disc text-left' key={genre.name}>{genre.name}</li>
										))}
									</ul>
								</div>
							</div>
						</div>
					) : (
						<p>Нет такого фильма/сериала</p>
					)}
				</div>
			)}
			<button className='mt-4 text-black text-2xl bg-white px-4 py-2 rounded  hover:bg-transparent hover:text-white' onClick={()=>navigate('/')}> На главную</button>
		</div>
	);
};

export default MovieDetail;
