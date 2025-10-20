import { useContext } from "react";
import { CartContext } from "../store/CartContext.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";

export default function Product({ product }) {
    const { addProductToCart } = useContext(CartContext);
    return (
        <article>
            <img src={`${product.image}`} alt="IMAGE PRODUCT" />
            <h3>{product.name}</h3>
            <div className="meal-item-actions">
                <p className={"meal-item-price"}>{currencyFormatter.format(product.price)}</p>
            </div>

            <p className={"meal-item-description"}>{product.description}</p>
            <div className="meal-item-actions">
                <Button
                    onClick={() => {
                        addProductToCart(product.id);
                    }}
                >
                    Add to Cart
                </Button>
            </div>
        </article>
    );
}
