import { Fragment } from "react";
import { Link } from "react-router-dom";

const PRODUCTS = [
    { id: "p1", title: "Product 1" },
    { id: "p2", title: "Product 2" },
    { id: "p3", title: "Product 3" },
    { id: "p4", title: "Product 4" },
];

export default function ProductsPage() {
    return (
        <Fragment>
            <h1> Products page</h1>
            <ul>
                {PRODUCTS.map(item => {
                    return (
                        <li key={item.id}>
                            <Link to={`/products/${item.id}`}>{item.title}</Link>
                        </li>
                    );
                })}
            </ul>
        </Fragment>
    );
}
