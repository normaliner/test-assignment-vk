import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import MovieDetail from './pages/MovieDetails/MovieDetail';
import { ROUTES } from './utils/routes';
import Favourites from './pages/Favourites/Favourites'
function App() {
	return (
		<Routes>
			<Route index element={<Home />}></Route>
			<Route path={ROUTES.MOVIEDETAILS} element={<MovieDetail />} />
      <Route path={ROUTES.FAVOURITES} element={<Favourites />} />
		</Routes>
	);
}

export default App;
