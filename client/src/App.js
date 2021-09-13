import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import ManageMovies from './views/ManageMovies';
import MovieForm from './views/MovieForm';
import NotFound from './views/NotFound';
import FavoriteMovies from './views/FavoriteMovies';

function App() {
  return (
    <BrowserRouter>
      <div className="App container-fluid d-flex flex-column vh-100 p-0">
        <Navbar />
        <div className="flex-grow-1 bg-secondary">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/favorites">
              <FavoriteMovies />
            </Route>
            <Route path="/manage-movies/edit/:id">
              <MovieForm />
            </Route>
            <Route path="/manage-movies/add">
              <MovieForm />
            </Route>
            <Route path="/manage-movies" exact>
              <ManageMovies />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
