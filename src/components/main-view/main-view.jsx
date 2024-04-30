import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { CarouselView } from "../carousel-view/carousel-view";
import { Row, Col, Button, Spinner } from "react-bootstrap";
import { BoxArrowRight } from "react-bootstrap-icons";

const MainView = () => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        setLoading(true);
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
                setLoading(false);
            })
    }, [token]);

    return (
        <Row className="text-light justify-content-md-center">
            {!user ? (
                <>
                    <Col md={8}>
                        <h3>Login</h3>
                        <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token) }} />
                        <h3>Don't have an account?</h3>
                        <SignupView />
                    </Col>
                </>
            ) : loading ? (
                <>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </>
            ) : selectedMovie ? (
                <>
                    <Col className="w-100" md={12}>
                        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
                    </Col>
                    <hr />
                    {movies.filter((movie) =>
                        movie.title !== selectedMovie.title &&
                        movie.genre.name === selectedMovie.genre.name).length > 0 && <h2>Similar movies</h2>}
                    {movies.filter((movie) =>
                        movie.title !== selectedMovie.title &&
                        movie.genre.name === selectedMovie.genre.name).map((movie) =>
                            <Col className="mb-3 mt-3" key={movie.id} md={4}>
                                <MovieCard
                                    movie={movie}
                                    onMovieClick={(newSelectedMovie) => {
                                        setSelectedMovie(movie);
                                    }}
                                />
                            </Col>
                        )}
                </>
            ) : movies.length === 0 ? (
                <div>Nothing here :( </div>
            ) : (
                <>
                    <Col>
                        <Button variant="outline-light"
                            onClick={() => {
                                setUser(null);
                                setToken(null);
                                localStorage.clear();
                            }}><BoxArrowRight /></Button>
                    </Col>
                    <CarouselView movies={movies} />
                    {movies.map((movie) => (
                        <Col className="mb-3 mt-3" key={movie.id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(movie);
                                }} />
                        </Col>
                    ))}
                </>
            )}
        </Row>
    )
}
export default MainView;