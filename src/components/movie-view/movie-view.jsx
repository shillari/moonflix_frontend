export const MovieView = ({movie, onBackClick}) => {
    return (
        <div>
            <div>
                <img src={movie.imagePath}/>
            </div>
            <div>
                <span>Description: {movie.description}</span>
            </div>
            <div>
                <span>Director: {movie.director.name}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    )
}