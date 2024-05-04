import { useEffect, useState } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const FavoritesView = ({ movies }) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
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
            await fetch("https://moonflix-97228dafe8d1.herokuapp.com/users/" + encodeURIComponent(user), {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then((response) => response.json())
                .then((userReturned) => {
                    if (userReturned) {
                        setFavorites(userReturned.favoriteMovies);
                    }
                }).catch((err) => {
                    setLoading(false);
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