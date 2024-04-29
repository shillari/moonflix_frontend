import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://moonflix-97228dafe8d1.herokuapp.com/movies")
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
    }, []);

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
        </div>
    )
}
export default MainView;