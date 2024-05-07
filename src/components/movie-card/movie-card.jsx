import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { SuitHeartFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie }) => {

    const sanitizeTitle = (title) => {
        // Convert title to lowercase, replace spaces with underscores, and remove special characters
        let sanitizedTitle = title.toLowerCase().replace(/\s/g, '_').replace(/[^\w\s]/gi, '');
        return sanitizedTitle;
    };

    return (
        <Link className="link-card" as={Link} to={`/movies/${encodeURIComponent(movie.id)}`}>
            <Card className="text-light bg-dark h-100 movie-card card">
                <Card.Img variant="top" src={`${process.env.MOONFLIX_BACKEND}/img/${sanitizeTitle(movie.title)}.jpg`} alt="movie image" />

                {/* 
                <Button onClick={handleFavoriteButton} variant="outline-light"
                    value={movie.id}
                    className={`fav-button ${movie.favorite ? "favorite" : ""}`}
                    style={{ position: 'absolute', top: '5%', left: '93%', transform: 'translate(-50%, -50%)', fontSize: '25px' }}>
                    <SuitHeartFill />
                </Button>
                */}

                <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.description}</Card.Text>
                </Card.Body>
            </Card>
        </Link>

    )
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imagePath: PropTypes.string.isRequired,
        year: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired
        }),
        director: PropTypes.shape({
            name: PropTypes.string.isRequired,
            bio: PropTypes.string.isRequired,
            birth: PropTypes.string,
            death: PropTypes.string,
            imagePath: PropTypes.string
        }),
        actors: PropTypes.arrayOf(
            PropTypes.shape({
                name: PropTypes.string,
                imagePath: PropTypes.string
            })
        ),
        featured: PropTypes.bool
    }).isRequired
};