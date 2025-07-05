import LabeledNumberInput from "./components/LabeledNumberInput.jsx";
import Result from "./components/Result.jsx";
import { useState } from "react";
import { calculateInvestmentResults } from "./util/investment.js";

function App() {
    const [initialInvestment, setInitialInvestment] = useState(0);
    const [annualInvestment, setAnnualInvestment] = useState(0);
    const [expectedReturn, setExpectedReturn] = useState(0);
    const [duration, setDuration] = useState(0);


    return (
        <>
            <section id={"user-input"}>
                <div className={"input-group"}>
                    <LabeledNumberInput
                        labelText={"INITIAL INVESTMENT"}
                        value={initialInvestment}
                        onChange={event => setInitialInvestment(event.target.value)}
                    />
                    <LabeledNumberInput
                        labelText={"ANNUAL INVESTMENT"}
                        value={annualInvestment}
                        onChange={event => setAnnualInvestment(event.target.value)}
                    />
                </div>
                <div className={"input-group"}>
                    <LabeledNumberInput
                        labelText={"EXPECTED RETURNS"}
                        value={expectedReturn}
                        onChange={event => setExpectedReturn(event.target.value)}
                    />
                    <LabeledNumberInput
                        labelText={"DURATION"}
                        value={duration}
                        onChange={event => setDuration(event.target.value)}
                    />
                </div>
            </section>
            <Result onValueInput={[initialInvestment, annualInvestment, expectedReturn, duration ]} />
        </>
    );
}

export default App;
