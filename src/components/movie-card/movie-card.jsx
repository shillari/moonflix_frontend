import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div className="movie-card">
            <div className="movie-card__item"
                onClick={() => {
                    onMovieClick(movie);
                }}>
                {movie.title}
            </div>
        </div>
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