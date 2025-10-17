import Product from "./Product.jsx";
import { Fragment, useContext } from "react";
import { ProductContext } from "../store/product-context.jsx";


export default function Products() {
    const { products, error, isFetching, setFetchedData, setIsFetching } =
        useContext(ProductContext);


    return (
        <Fragment>
            {error && <div className={"center"}><p>{error.message}</p></div>}
            {isFetching && <div className={"center"}><p>Fetching products...</p></div>}
            {!isFetching && (
                <ul id={"meals"}>
                    {products.map(product => {
                        return (
                            <li className={"meal-item"} key={product.id}>
                                <Product product={product} />
                            </li>
                        );
                    })}
                </ul>
            )}
        </Fragment>
    );
}
