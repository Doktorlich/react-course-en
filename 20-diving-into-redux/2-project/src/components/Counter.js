import classes from "./Counter.module.css";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
    const dispatch = useDispatch();
    const incrementHandler = () => {
        dispatch({ type: "increment" });
    };
    const decrementHandler = () => {
        dispatch({ type: "decrement" });
    };
    const increaseHandler = () => {
        dispatch({ type: "increase", amount: 5 });
    };
    const toggleCounterHandler = () => {
        dispatch({ type: "toggle" });
    };

    const counter = useSelector(state => state.counter);
    const isCounter = useSelector(state => state.showCounter);
    console.log(isCounter);
    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {isCounter && <div className={classes.value}>{counter}</div>}
            <div>
                <button onClick={incrementHandler}>Increment</button>
                <button onClick={increaseHandler}>Increase by 5</button>
                <button onClick={decrementHandler}>Decrement</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;
