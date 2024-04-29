export const MovieView = ({movie, onBackClick}) => {
    return (
        <div>
            <div>
                <img src={movie.imagePath}/>
            </div>
            <div>
                <span>Title: {movie.title}</span>
            </div>
            <div>
                <span>Description: {movie.description}</span>
            </div>
            <div>
                <span>Year: {movie.year}</span>
            </div>
            <div>
                <span>Genre: {movie.genre.name}</span>
            </div>
            <div>
                <span>Director: {movie.director.name}</span>
            </div>
            <div>
                <span>Actors: {movie.actors[0].name} | {movie.actors[1].name} | {movie.actors[2].name}</span>
            </div>
            <button onClick={onBackClick}>Back</button>
        </div>
    )
}