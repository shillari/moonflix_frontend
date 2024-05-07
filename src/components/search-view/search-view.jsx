import { MovieCard } from "../movie-card/movie-card";
import { useParams } from "react-router";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";

export const SearchView = () => {
    const { q } = useParams();
    const movies = useSelector((state) => state.movies.list);
    const matchMovies = movies.filter((m) => m.title.toLowerCase().includes(q.toLowerCase()));

    return (
        <>
            {matchMovies.length === 0 && (
                <>
                    <h1>Results</h1>
                    <hr />
                    <div>Nothing found :( </div>
                </>
            )}
            {matchMovies.length > 0 && (
                <>
                    <h1>Results</h1>
                    <hr />
                    <Row xs={1} md={4} className="g-4 w-100 h-100">
                        {matchMovies.map((movie) => (
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