import "./movie-view.scss";
import React, { useEffect } from "react";
import { Col, Row, Figure, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { CheckSquare, Square } from "react-bootstrap-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const MovieView = () => {
    const { id } = useParams();
    const user = useSelector((state) => state.user.username);
    const token = useSelector((state) => state.user.token);
    const movies = useSelector((state) => state.movies.list);
    const [favoriteMovie, setFavoriteMovie] = useState(false);
    const navigate = useNavigate();

    const fetchUser = async () => {
        await fetch(`${process.env.MOONFLIX_BACKEND}/users/${encodeURIComponent(user)}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((userReturned) => {
                const u = {
                    username: userReturned.username,
                    email: userReturned.email,
                    birthday: userReturned.birthday,
                    favoriteMovies: userReturned.favoriteMovies
                };
                setFavoriteMovie(userReturned.favoriteMovies.includes(id));
            })
            .catch((err) => {
                console.log(err);
                navigate("/error/" + 500);
            });
    }

    const addFavorite = async () => {
        await fetch(`${process.env.MOONFLIX_BACKEND}/users/${encodeURIComponent(user)}/movies/${encodeURIComponent(id)}`, {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((userReturned) => {
                const u = {
                    username: userReturned.username,
                    email: userReturned.email,
                    birthday: userReturned.birthday,
                    favoriteMovies: userReturned.favoriteMovies
                };
                setFavoriteMovie(userReturned.favoriteMovies.includes(id));
            })
            .catch((err) => {
                console.log(err);
                navigate("/error/" + 500);
            });
    }

    const removeFavorite = async () => {
        await fetch(`${process.env.MOONFLIX_BACKEND}/users/${encodeURIComponent(user)}/movies/${encodeURIComponent(id)}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((userReturned) => {
                const u = {
                    username: userReturned.username,
                    email: userReturned.email,
                    birthday: userReturned.birthday,
                    favoriteMovies: userReturned.favoriteMovies
                };
                setFavoriteMovie(userReturned.favoriteMovies.includes(id));
            })
            .catch((err) => {
                console.log(err);
                navigate("/error/" + 500);
            });
    }

    useEffect(() => {
        fetchUser();
    }, [id])

    const movie = movies.find((m) => m.id === id);
    const similarMovies = movies.filter((m) =>
        m.title !== movie.title &&
        m.genre.name === movie.genre.name);

    const sanitizeTitle = (title) => {
        // Convert title to lowercase, replace spaces with underscores, and remove special characters
        let sanitizedTitle = title.toLowerCase().replace(/\s/g, '_').replace(/[^\w\s]/gi, '');
        return sanitizedTitle;
    };

    const handleFavoriteButton = (e) => {
        e.preventDefault();
        fetchUser();

        if (favoriteMovie) {
            removeFavorite();
        } else {
            addFavorite();
        }
    }

    return (
        <>
            <Row>
                <Col className="mb-3 mt-3" md={12}>
                    <img title={movie.title} className="img-fluid rounded mx-auto d-block" src={`${process.env.MOONFLIX_BACKEND}/img/${sanitizeTitle(movie.title)}.jpg`} />
                </Col>
                <Col className="mb-3 mt-3" md={12}>
                    <Button className={favoriteMovie ? 'custom-button-fav favorite' : 'custom-button-fav'} onClick={handleFavoriteButton}>
                        {favoriteMovie ? <><CheckSquare /><span> Remove from favorites</span></>
                            : <><Square /><span> Add to favorites</span> </>}
                    </Button>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs={8} md={10}>
                    <h2>{movie.title}</h2>
                    <span>Genre: {movie.genre.name}</span>
                    <p>Year: {movie.year}</p>
                    <p>Description: {movie.description}</p>
                </Col>
                <Col xs={4} md={2} className="text-center" >
                    <h5>Director</h5>
                    <Figure className="text-center figure-director">
                        <Figure.Image title={movie.director.name} className="rounded" width={50} height={50} alt="director image" src={movie.director.imagePath} />
                        <Figure.Caption className="text-light text-center">
                            {movie.director.name.split(' ').map((word, index) => (
                                <React.Fragment key={index}>
                                    {word}
                                    <br />
                                </React.Fragment>
                            ))}</Figure.Caption>
                    </Figure>
                </Col>
            </Row>
            <hr />
            {similarMovies.length > 0 && <h2>Similar movies</h2>}
            {similarMovies.map((movie) =>
                <Col className="mb-3 mt-3" key={movie.id} md={4}>
                    <MovieCard
                        movie={movie}
                    />
                </Col>
            )}
        </>
    )
}