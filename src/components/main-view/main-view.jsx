import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { CarouselView } from "../carousel-view/carousel-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col, Spinner } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SearchView } from "../search-view/search-view";
import { FavoritesView } from "../favorites-view/favorites-view";
import { ScrollTop } from "../scroll-top/scroll-top";

const MainView = () => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const fetchMovies = async () => {
            await fetch("https://moonflix-97228dafe8d1.herokuapp.com/movies", {
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
        }

        fetchMovies();
        setLoading(false);
    }, [token]);

    return (
        <BrowserRouter>
            <NavigationBar user={user}
                onLogout={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }} />

            <Row className="text-light justify-content-md-center">
                <ScrollTop>
                    <Routes>
                        <Route
                            path="/signup"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5}>
                                            <SignupView />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <>
                                    {user ? (
                                        <Navigate to="/" />
                                    ) : (
                                        <Col md={5} >
                                            <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token) }} />
                                        </Col>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/profile"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : (
                                        <ProfileView movies={movies}
                                            onDelete={() => {
                                                setUser(null);
                                                setToken(null);
                                                localStorage.clear();
                                            }} />

                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/movies/:id"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : loading ? (
                                        <>
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        </>
                                    ) : movies.length === 0 ? (
                                        <Col>Nothing here :( </Col>
                                    ) : (
                                        <>
                                            <MovieView movies={movies} />
                                        </>
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/search/:q"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : (
                                        <SearchView movies={movies} />
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/favorites"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : (
                                        <FavoritesView movies={movies} />
                                    )}
                                </>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <>
                                    {!user ? (
                                        <Navigate to="/login" replace />
                                    ) : loading ? (
                                        <>
                                            <Spinner animation="border" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </Spinner>
                                        </>
                                    ) : movies.length === 0 ? (
                                        <Col></Col>
                                    ) : (
                                        <>
                                            <CarouselView movies={movies} />
                                            {movies.map((movie) => (
                                                <Col className="mb-3 mt-3" key={movie.id} md={3}>
                                                    <MovieCard
                                                        movie={movie}
                                                    />
                                                </Col>
                                            ))}
                                        </>
                                    )}
                                </>
                            }
                        />
                    </Routes>
                </ScrollTop>
            </Row>
        </BrowserRouter>
    )
}
export default MainView;