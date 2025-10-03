import { useState } from "react";

export default function StateLogin() {

    const [enteredValues, setEnteredValues] = useState({
        email: "",
        password: "",
    });

    function handleInputChange(event) {
        const { name, value } = event.target;
        console.log("Name: " + name);
        console.log("Value: " + value);
        setEnteredValues(prevState => ({ ...prevState, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Entered Email: " + enteredValues.email);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>State Login</h2>

            <div className="control-row">
                <div className="control no-margin">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        onChange={handleInputChange}
                        value={enteredValues.email}
                    />
                </div>

                <div className="control no-margin">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        onChange={handleInputChange}
                        value={enteredValues.password}
                    />
                </div>
            </div>

            <p className="form-actions">
                <button className="button button-flat">Reset</button>
                <button className="button">Login</button>
            </p>
        </form>
    );
}
