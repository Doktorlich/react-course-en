import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";

const CartButton = props => {
    const dispatch = useDispatch();
    const quantityItems = useSelector((state) =>state.cart.cartItems);
    function handleToggle() {
        dispatch(cartActions.toggle());
    }

    return (
        <button className={classes.button} onClick={handleToggle}>
            <span>My Cart</span>
            {quantityItems.length>0 && <span className={classes.badge}>{quantityItems.length}</span>}
        </button>
    );
};

export default CartButton;
