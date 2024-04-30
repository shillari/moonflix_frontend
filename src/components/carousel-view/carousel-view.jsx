import { Carousel } from "react-bootstrap";

export const CarouselView = ({ movies }) => {
    const sanitizeTitle = (title) => {
        // Convert title to lowercase, replace spaces with underscores, and remove special characters
        let sanitizedTitle = title.toLowerCase().replace(/\s/g, '_').replace(/[^\w\s]/gi, '');
        return sanitizedTitle;
    };

    return (
        <Carousel>
            <Carousel.Item>
                <img title={movies[0].title} className="img-caroussel w-100 h-100" src={`https://moonflix-97228dafe8d1.herokuapp.com/img/${sanitizeTitle(movies[0].title)}.jpg`} alt="movie image" />
                <Carousel.Caption>
                    <h3>{movies[0].title}</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img title={movies[1].title} className="img-caroussel w-100 h-100" src={`https://moonflix-97228dafe8d1.herokuapp.com/img/${sanitizeTitle(movies[1].title)}.jpg`} alt="movie image" />
                <Carousel.Caption>
                    <h3>{movies[1].title}</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img title={movies[2].title} className="img-caroussel w-100 h-100" src={`https://moonflix-97228dafe8d1.herokuapp.com/img/${sanitizeTitle(movies[2].title)}.jpg`} alt="movie image" />
                <Carousel.Caption>
                    <h3>{movies[2].title}</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}