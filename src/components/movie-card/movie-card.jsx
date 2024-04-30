import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { SuitHeartFill } from "react-bootstrap-icons";

export const MovieCard = ({ movie, onMovieClick }) => {
    const sanitizeTitle = (title) => {
        // Convert title to lowercase, replace spaces with underscores, and remove special characters
        let sanitizedTitle = title.toLowerCase().replace(/\s/g, '_').replace(/[^\w\s]/gi, '');
        return sanitizedTitle;
    };

    return (
        <Card className="text-light bg-dark h-100 movie-card card" onClick={() => {
            onMovieClick(movie);
        }}>
            <Card.Img variant="top" src={`https://moonflix-97228dafe8d1.herokuapp.com/img/${sanitizeTitle(movie.title)}.jpg`} alt="movie image" />
            {/*
           <Button variant="outline-light" className="fav-button" style={{ position: 'absolute', top: '5%', left: '93%', transform: 'translate(-50%, -50%)', fontSize: '25px' }}>
                <SuitHeartFill />
            </Button>
    */}
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
            </Card.Body>
        </Card>

    )
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
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
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};