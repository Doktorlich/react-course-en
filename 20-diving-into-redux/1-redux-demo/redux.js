const redux = require("redux");
// так как функция редусер запускается впервые ей необходимо задавать параметр по умолчанию, если его не задать вылезает ошибка

// чистая функция-редъюсер
const counterReducer = (state = { counter: 0 }, action) => {
    if (action.type === "increment") {
        return { counter: state.counter + 1 };
    }
    if (action.type === "decrement") {
        return { counter: state.counter - 1 };
    }
    return state;
};
//создание хранилища внутри которого как параметр вставляем функцию редъюсер
const store = redux.createStore(counterReducer);
//
const counterSubscriber = () => {
    const currentStore = store.getState();
    console.log(currentStore);
};

store.subscribe(counterSubscriber);
store.dispatch({ type: "increment" });

