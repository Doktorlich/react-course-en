import Card from "../UI/Card";
import classes from "./ProductItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";



const ProductItem = props => {
    const dispatch = useDispatch();
    const { id, title, price, description } = props;
    console.log(title, price, description, "title, price, description ");


    function handleAddToCart() {

        dispatch(
            cartActions.addToCart({
                id: id,
                title: title,
                quantity: 1,
                price: price,
                description: description,
            }),
        );
    }

    return (
        <li className={classes.item}>
            <Card>
                <header>
                    <h3>{title}</h3>
                    <div className={classes.price}>${price.toFixed(2)}</div>
                </header>
                <p>{description}</p>
                <div className={classes.actions}>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </Card>
        </li>
    );
};

export default ProductItem;
