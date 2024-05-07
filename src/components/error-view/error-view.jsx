import { useParams } from "react-router";
import errorImg from "../../img/error.png";

export const ErrorView = () => {
    const { err } = useParams();

    return (
        <>
            <img src={errorImg} style={{ width: "700px", height: "550px" }} alt="moon and a popcorn" />
            {err ? (
                <>
                    <h1>Error {err} - Sorry, something is wrong. You can try again later.</h1>
                </>
            ) : (
                <>
                    <h1>Sorry, something is wrong. You can try again later.</h1>
                </>
            )}
        </>
    );
}