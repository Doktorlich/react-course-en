import { calculateInvestmentResults, formatter } from "../util/investment.js";

export default function Result({ onValueInput: results }) {
    console.log(results);
    const initialInvestment = results[0].valueEndOfYear - results[0].interest - results[0].annualInvestment;
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
                {results.map(result => {
                    const totalInterest = result.valueEndOfYear - result.annualInvestment * result.year - initialInvestment;
                    const totalAmountInterest = result.valueEndOfYear - totalInterest

                    return (
                        <tr key={result.year}>
                            <td>{result.year}</td>
                            <td>{formatter.format(result.valueEndOfYear)}</td>
                            <td>{formatter.format(result.interest)}</td>
                            <td>{formatter.format(totalInterest)}</td>
                            <td>{formatter.format(totalAmountInterest)}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
