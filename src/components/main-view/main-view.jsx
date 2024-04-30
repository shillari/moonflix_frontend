import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

const MainView = () => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://moonflix-97228dafe8d1.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((movies) => {
                const moviesApi = movies.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.title,
                        description: movie.description,
                        imagePath: movie.imagePath,
                        year: movie.year,
                        genre: movie.genre,
                        director: movie.director,
                        actors: movie.actors,
                        featured: movie.featured
                    }
                });
                setMovies(moviesApi);
            })
    }, [token]);

    if (!user) {
        return (
            <div>
                <div>
                    <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token) }} />
                </div>
                <div>
                    <h3>Don't have an account?</h3>
                    <SignupView />
                </div>
            </div>
        )
    }

    if (selectedMovie) {
        let similarMovies = movies.filter((movie) =>
            movie.title !== selectedMovie.title &&
            movie.genre.name === selectedMovie.genre.name);
        return (
            <>
                <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                <hr />
                {similarMovies.length > 0 && <h2>Similar movies</h2>}
                {similarMovies.map((movie) =>
                    <MovieCard key={movie.id}
                        movie={movie}
                        onMovieClick={(newSelectedMovie) => {
                            setSelectedMovie(movie);
                        }}
                    />)}
            </>
        );
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(movie);
                    }} />
            ))}
            <button onClick={() => {
                setUser(null);
                setToken(null);
                localStorage.clear();
            }}>Logout</button>
        </div>
    )
}
export default MainView;