import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
    const [movies, setMovies] = useState([
        {
            "genre": {
                "name": "Action",
                "description": "Exciting and fast-paced films with lots of physical activity and spectacle."
            },
            "director": {
                "name": "Christopher Nolan",
                "bio": "A British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling.",
                "birth": "1970",
                "death": null
            },
            "_id": "662808f8d2488e9bc5117b7f",
            "title": "Inception",
            "description": "A thief who enters the dreams of others to steal their secrets.",
            "imagePath": "https://miro.medium.com/v2/resize:fit:500/1*WqEQPJE5BUGRvDMuL4OWtw.jpeg",
            "featured": false
        },
        {
            "genre": {
                "name": "Science Fiction",
                "description": "Science fiction, popularly shortened as sci-fi, is a genre of fiction that creatively depicts real or imaginary science and technology as part of its plot, setting, or theme."
            },
            "director": {
                "name": "Steven Spielberg",
                "bio": "An American film director, producer, and screenwriter known for his work in the adventure and science fiction genres.",
                "birth": "1946",
                "death": null
            },
            "_id": "662808f8d2488e9bc5117b7e",
            "title": "E.T. the Extra-Terrestrial",
            "description": "A troubled child summons the courage to help a friendly alien escape Earth and return to his home world.",
            "imagePath": "https://upload.wikimedia.org/wikipedia/en/6/66/E_t_the_extra_terrestrial_ver3.jpg",
            "featured": false
        },
        {
            "genre": {
                "name": "Drama",
                "description": "Movies focused on realistic characters, settings, and stories that evoke emotion."
            },
            "director": {
                "name": "Frank Darabont",
                "bio": "An American screenwriter, director and producer. He has been nominated for three Academy Awards and a Golden Globe Award.",
                "birth": "1959",
                "death": null
            },
            "_id": "662808f8d2488e9bc5117b81",
            "title": "The Shawshank Redemption",
            "description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            "imagePath": "https://miro.medium.com/v2/resize:fit:1400/1*KBwRKCB9g4O0ojNzYC1uvw.jpeg",
            "featured": false
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard key={movie._id} 
                movie={movie} 
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(movie);
                }} />
            ))}
        </div>
    )
}
export default MainView;