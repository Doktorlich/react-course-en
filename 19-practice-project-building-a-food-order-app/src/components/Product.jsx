import { Fragment, useContext } from "react";
import { CartContext } from "../store/cart-context.jsx";

export default function Product({ product }) {
    const { addProductToCart } = useContext(CartContext);
    return (
        <article>
            <img src={`${product.image}`} alt="IMAGE PRODUCT" />
            <h3>{product.name}</h3>
            <div className="meal-item-actions">
                <p className={"meal-item-price"}>${product.price}</p>
            </div>

            <p className={"meal-item-description"}>{product.description}</p>
            <div className="meal-item-actions">
                <button
                    className={"button"}
                    onClick={() => {
                        addProductToCart(product.id);
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </article>
    );
}
