import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	setGenres,
	setRatingRange,
	setYearRange,
} from '../../store/movieSlice';
import { RootState } from '../../store/store';

interface FiltersProps {
	onClick: () => void;
}

const Filters:FC<FiltersProps> = ({onClick}) => {
	const dispatch = useDispatch();
	const {selectedGenres, ratingRange, yearRange } = useSelector((s: RootState) => s.movie);
	const [genreInput, setGenreInput] = useState('');

	useEffect(() => {
    setGenreInput(selectedGenres.join(', '));
  }, [selectedGenres]);

	const handleChangeGenre = (e: ChangeEvent<HTMLInputElement>) => {
		setGenreInput(e.target.value);
	};
	const handleChangeBlurGenre = () => {
		const newSelectedGeners = genreInput
			.split(',')
			.map(genre => genre.trim())
			.filter(genre => genre);
		dispatch(setGenres(newSelectedGeners));
	};
	const handleChangeRating = (
		e: ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const newRangeRating = [...ratingRange] as [number, number];
		newRangeRating[index] = parseInt(e.target.value, 10);
		dispatch(setRatingRange(newRangeRating));
	};
	const handleChangeDate = (
		e: ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const newRangeDate = [...yearRange] as [number, number];
		newRangeDate[index] = parseInt(e.target.value, 10);
		dispatch(setYearRange(newRangeDate));
	};
	return (
		<div className='p-4 bg-gray-100 rounded shadow mb-4'>
			<div className='p-4 bg-gray-100 rounded shadow mb-4 text-black flex justify-around'>
				<div className='mb-4 basis-3/5'>
					<h3 className='text-lg font-semibold mb-2'>Жанры</h3>
					<input
						type='text'
						value={genreInput}
						placeholder='Введите жанр (пример: драма, комедия)'
						className='border p-2 rounded w-full'
						onChange={handleChangeGenre}
						onBlur={handleChangeBlurGenre}
					/>
				</div>
				<div className='mb-4'>
					<h3 className='text-lg font-semibold mb-2'>Рейтинг</h3>
					<div className='mb-2'>
						<label> От </label>
						<input
							type='number'
							value={ratingRange[0]}
							min='0'
							max='10'
							className='border p-2 rounded ml-2'
							onChange={e => handleChangeRating(e, 0)}
						/>
					</div>
					<div className='mb-2 '>
						<label className='w-10'>До </label>
						<input
							type='number'
							value={ratingRange[1]}
							min='0'
							max='10'
							className='border p-2 rounded  ml-2 justify-self-end'
							onChange={e => handleChangeRating(e, 1)}
						/>
					</div>
				</div>
				<div className='mb-4'>
					<h3 className='text-lg font-semibold mb-2'>Дата</h3>
					<div className='mb-2'>
						<label > От </label>
						<input
							type='number'
							value={yearRange[0]}
							min='0'
							max={new Date().getFullYear()}
							className='border p-2 rounded ml-2'
							onChange={e => handleChangeDate(e, 0)}
						/>
					</div>
					<div className=''>
						<label className=''> До </label>

						<input
							type='number'
							value={yearRange[1]}
							min='0'
							max={new Date().getFullYear()}
							className='border p-2 rounded ml-2'
							onChange={e => handleChangeDate(e, 1)}
						/>
					</div>
				</div>
			</div>
			<button className='mt-4 text-white text-xl bg-black px-4 py-2 rounded  hover:bg-transparent hover:text-black' onClick={onClick}>
				Применить фильтры
			</button>
		</div>
	);
};

export default Filters;
