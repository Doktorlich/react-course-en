import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";

const CartButton = props => {
    const dispatch = useDispatch();
    const quantityItems = useSelector(state => state.cart.cartItems);
    function handleToggle() {
        dispatch(uiActions.toggle());
    }

    return (
        <button className={classes.button} onClick={handleToggle}>
            <span>My Cart</span>
            {quantityItems?.length > 0 && (
                <span className={classes.badge}>{quantityItems?.length}</span>
            )}
        </button>
    );
};

export default CartButton;
