import { useEffect, useState } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

export const FavoritesView = () => {
    const token = useSelector((state) => state.user.token);
    const user = useSelector((state) => state.user.username);
    const movies = useSelector((state) => state.movies.list);
    const navigate = useNavigate();
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!token) {
            setLoading(false);
            <div>You are not authorized!</div>
            return;
        }

        setLoading(true);
        const fetchUser = async () => {
            await fetch(`${process.env.MOONFLIX_BACKEND}/users/${encodeURIComponent(user)}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => response.json())
                .then((userReturned) => {
                    if (userReturned) {
                        setFavorites(userReturned.favoriteMovies);
                    }
                }).catch((err) => {
                    console.log(err);
                    setLoading(false);
                    navigate("/error/" + 500);
                })
        }
        fetchUser();
        setLoading(false);
    }, [token, user]);


    let favoriteList = [];
    favoriteList = movies.filter((m) => favorites.includes(m.id));

    return (
        <>
            {loading ? (
                <>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </>
            ) : favoriteList.length === 0 ? (
                <>
                    <h1>Favorite Movies</h1>
                    <hr />
                    <div>Nothing here :( </div>
                </>
            ) : (
                <>
                    <h1>Favorite Movies</h1>
                    <hr />
                    <Row xs={1} md={4} className="g-4">
                        {favoriteList.map(movie => (
                            <Col key={movie.id}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}
        </>
    )
}