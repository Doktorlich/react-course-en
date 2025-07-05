import { calculateInvestmentResults } from "../util/investment.js";

export default function Result({ onValueInput }) {
    const [initialInvestment, annualInvestment, expectedReturn, duration] = onValueInput;
   const result = calculateInvestmentResults({ initialInvestment, annualInvestment, expectedReturn, duration });


    return (
        <table id={"result"}>
            <thead>
                <tr>
                    <td>Year</td>
                    <td>Investment Value</td>
                    <td>Interest (Year)</td>
                    <td>Total Interest</td>
                    <td>Invested Caption</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>$16,725</td>
                    <td>$825</td>
                    <td>$825</td>
                    <td>15,900</td>
                </tr>
            </tbody>
        </table>
    );
}
