import classes from "./Counter.module.css";
import { useDispatch, useSelector ,connect} from "react-redux";
import { Component } from "react";

// const Counter = () => {
//     const dispatch = useDispatch()
//     const incrementHandler = () => {
//         dispatch({type:"increment"})
//     };
//     const decrementHandler = () => {
//         dispatch({type:"decrement"})
//     };
//
//     const toggleCounterHandler = () => {};
//     const counter = useSelector(state => state.counter);
//     return (
//         <main className={classes.counter}>
//             <h1>Redux Counter</h1>
//             <div className={classes.value}>{counter}</div>
//             <div>
//                 <button onClick={incrementHandler}>Increment</button>
//                 <button onClick={decrementHandler}>Decrement</button>
//             </div>
//             <button onClick={toggleCounterHandler}>Toggle Counter</button>
//         </main>
//     );
// };

class CounterClasses extends Component {

    incrementHandler(){
        this.props.increment()
    }
    decrementHandler(){
        this.props.decrement()
    }
    toggleCounterHandler(){}
    render() {
        return (
            <main className={classes.counter}>
                <h1>Redux Counter</h1>
                <div className={classes.value}>{this.props.counter}</div>
                <div>
                    <button onClick={this.incrementHandler.bind(this)}>Increment</button>
                    <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
                </div>
                <button onClick={this.toggleCounterHandler}>Toggle Counter</button>
            </main>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
}
const mapDispatchToProps = dispatch => {
    return {
        increment: () => {
            return dispatch({type:"increment"})
        },
        decrement: () => {
            return dispatch({type:"decrement" +
                    ""})
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CounterClasses);
