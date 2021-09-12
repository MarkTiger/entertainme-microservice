import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './views/Home';
import ManageMovies from './views/ManageMovies';
import MovieForm from './views/MovieForm';
import NotFound from './views/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App container-fluid vh-100">
        <div className="row">
          <Navbar />
        </div>
        <div className="row h-100">
          <Switch>
            <Route path="/" exact>
              <Home />
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
