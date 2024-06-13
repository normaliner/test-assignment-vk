export interface IMovie {
	id: number;
	name: string;
	alternativeName: string;
	type: string;
	typeNumber: number;
	year: number;
	description: string;
	shortDescription: null;
	slogan: null;
	status: null;
	rating: IRating;
	votes: IRating;
	movieLength: null;
	totalSeriesLength: number;
	seriesLength: number;
	ratingMpaa: null;
	ageRating: null;
	poster: IPoster;
	genres: IGenre[];
	countries: ICountry[];
	persons: IPerson[];
	premiere: IPremiere;
	releaseYears: IReleaseYear;
	top10: null;
	top250: null;
	isSeries: boolean;
	ticketsOnSale: boolean;
	lists: null;
	createdAt: Date;
	updatedAt: Date;
}

export interface IGenre {
	name: string;
}
export interface ICountry {
	name: string;
}
export interface IRating {
	kp: number;
	imdb: number;
	filmCritics: number;
	russianFilmCritics: number;
	await: number;
}
export interface IPoster {
	url: string;
	previewUrl: string;
}
export interface IPerson {
	id: number;
	photo: string;
	name: string;
	enName: string;
	description: null | string;
	profession: string;
	enProfession: string;
}
export interface IPremiere {
	country: null;
	russia: null;
	digital: null;
	cinema: null;
	bluray: null;
	dvd: null;
}
export interface IReleaseYear {
	start: number;
	end: null;
}
