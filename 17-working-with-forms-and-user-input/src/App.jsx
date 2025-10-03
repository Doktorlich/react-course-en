import Header from "./components/Header.jsx";
import RefLogin from "./components/RefLogin.jsx";
import StateLogin from "./components/StateLogin.jsx";

function App() {
    return (
        <>
            <Header />
            <main>
                <StateLogin />
                <RefLogin />
            </main>
        </>
    );
}

export default App;
