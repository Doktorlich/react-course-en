import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = props => {
    const isCart = useSelector(state => state.ui.isCart);
    const cartItems = useSelector(state => state.cart.cartItems);

    return (
        !isCart && (
            <Card className={classes.cart}>
                <h2>Your Shopping Cart</h2>
                <ul>
                    {cartItems.map(item => {
                        return (
                            <CartItem
                                key={`${item.title}+${Math.random()}`}
                                item={{
                                    id: item.id,
                                    title: item.title,
                                    quantity: item.quantity,
                                    total: item.price * item.quantity,
                                    price: item.price,
                                }}
                            />
                        );
                    })}
                </ul>
            </Card>
        )
    );
};

export default Cart;
