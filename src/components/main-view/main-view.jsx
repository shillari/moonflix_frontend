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
import { ErrorView } from "../error-view/error-view";
import { FavoritesView } from "../favorites-view/favorites-view";
import { ScrollTop } from "../scroll-top/scroll-top";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies";

const MainView = () => {
    const user = useSelector((state) => state.user.username);
    const token = useSelector((state) => state.user.token);
    const movies = useSelector((state) => state.movies.list);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const fetchMovies = async () => {
            await fetch(`${process.env.MOONFLIX_BACKEND}/movies`, {
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
                    dispatch(setMovies(moviesApi));
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        fetchMovies();
        setLoading(false);
    }, [token]);

    return (
        <BrowserRouter>
            <NavigationBar />

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
                                            <LoginView />
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
                                        <ProfileView />
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
                                            <MovieView />
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
                                        <SearchView />
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
                                        <FavoritesView />
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
                                            <CarouselView />
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
                        <Route
                            path="/error/:err"
                            element={
                                <>
                                    <ErrorView />
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