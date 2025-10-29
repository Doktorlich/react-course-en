import Counter from "./components/Counter";
import { Fragment } from "react";
import Header from "./components/Header";
import Auth from "./components/Auth";
import UserProfile from "./components/UserProfile";
import { useSelector } from "react-redux";

function App() {
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    console.log(isAuth);
    return (
        <Fragment>
            <Header/>
            {isAuth && <UserProfile />}
            {!isAuth && <Auth />}
            <Counter />
        </Fragment>
    );
}

export default App;
