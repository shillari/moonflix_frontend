import { Spinner } from "react-bootstrap";

export const LoadingView = () => {
    return (
        <>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </>
    );
}