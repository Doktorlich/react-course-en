import { Fragment } from "react";
import { Link } from "react-router-dom";


export default function HomePage() {
    return (
        <Fragment>
            {/*<MainNavigation/>*/}
            <h1>My home page</h1>
            <p>
                Go to <Link to={"/products"}>Products</Link>
            </p>
        </Fragment>
    );
}
