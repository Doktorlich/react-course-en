// import User from "./User";
import Header from "./components/Header/Header";
import CoreConcept from "./components/CoreConcept";
import TabButton from "./components/TabButton";
import { CORE_CONCEPTS, EXAMPLES } from "./data.js";
import { Fragment, useState } from "react";
import CoreConcepts from "./components/CoreConcepts";
import Examples from "./components/Examples";

function App() {
    return (
        <>
            <Header />
            <main>
                <CoreConcepts />
                <Examples />
            </main>
        </>
    );
}

export default App;
