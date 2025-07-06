import LabeledNumberInput from "./components/LabeledNumberInput.jsx";
import Result from "./components/Result.jsx";
import { useState } from "react";
import { calculateInvestmentResults } from "./util/investment.js";

function App() {
    const [userInput, setUserInput] = useState({
        initialInvestment: 10000,
        annualInvestment: 1200,
        expectedReturn: 6,
        duration: 10,
    });

    const results = calculateInvestmentResults(userInput);
    function handleTotalInvestment(inputName, inputValue) {
        setUserInput(prevState => {
            return { ...prevState, [inputName]: inputValue };
        });
    }

    return (
        <>
            <section id={"user-input"}>
                <div className={"input-group"}>
                    <LabeledNumberInput
                        labelText={"INITIAL INVESTMENT"}
                        value={userInput.initialInvestment}
                        onChange={event => handleTotalInvestment("initialInvestment", event.target.value)}
                    />
                    <LabeledNumberInput
                        labelText={"ANNUAL INVESTMENT"}
                        value={userInput.annualInvestment}
                        onChange={event => handleTotalInvestment("annualInvestment", event.target.value)}
                    />
                </div>
                <div className={"input-group"}>
                    <LabeledNumberInput
                        labelText={"EXPECTED RETURNS"}
                        value={userInput.expectedReturn}
                        onChange={event => handleTotalInvestment("expectedReturn", event.target.value)}
                    />
                    <LabeledNumberInput
                        labelText={"DURATION"}
                        value={userInput.duration}
                        onChange={event => handleTotalInvestment("duration", event.target.value)}
                    />
                </div>
            </section>
            {results.length > 0 && <Result onValueInput={results} />}
        </>
    );
}

export default App;
