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
}