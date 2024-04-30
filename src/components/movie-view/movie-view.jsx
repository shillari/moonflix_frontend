import "./movie-view.scss";
import React from "react";
import { Col, Row, Figure, Button } from "react-bootstrap";
import { ArrowReturnLeft } from "react-bootstrap-icons";

export const MovieView = ({ movie, onBackClick }) => {
    const sanitizeTitle = (title) => {
        // Convert title to lowercase, replace spaces with underscores, and remove special characters
        let sanitizedTitle = title.toLowerCase().replace(/\s/g, '_').replace(/[^\w\s]/gi, '');
        return sanitizedTitle;
    };

    return (
        <div className="movie-view">
            <Button variant="outline-light"
                onClick={onBackClick}><ArrowReturnLeft /></Button>
            <Row>
                <Col className="mb-3 mt-3" md={12}>
                    <img title={movie.title} className="img-fluid rounded mx-auto d-block" src={`https://moonflix-97228dafe8d1.herokuapp.com/img/${sanitizeTitle(movie.title)}.jpg`} />
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Col xs={6} md={11}>
                    <h2>{movie.title}</h2>
                    <span>Genre: {movie.genre.name}</span>
                    <p>Year: {movie.year}</p>
                    <p>Description: {movie.description}</p>
                </Col>
                <Col md={1}>
                    <h5>Director</h5>
                    <Figure className="figure-director">
                        <Figure.Image title={movie.director.name} className="rounded" width={50} height={50} alt="director image" src={movie.director.imagePath} />
                        <Figure.Caption className="text-light text-center">
                            {movie.director.name.split(' ').map((word, index) => (
                                <React.Fragment key={index}>
                                    {word}
                                    <br />
                                </React.Fragment>
                            ))}</Figure.Caption>
                    </Figure>
                </Col>
            </Row>
        </div>
    )
}