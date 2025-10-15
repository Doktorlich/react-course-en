import Product from "./Product.jsx";
import { useContext } from "react";
import { ProductContext } from "../store/product-context.jsx";
import { CartContext } from "../store/cart-context.jsx";

export default function Products() {
    const { products } = useContext(ProductContext);

    if (products === null) {
        return <p>Loading products...</p>;
    }
    return (
        <ul id={"meals"}>
            {products.map(product => {
                return (
                    <li className={"meal-item"} key={product.id}>
                        <Product product={product} />
                    </li>
                );
            })}
        </ul>
    );
}
