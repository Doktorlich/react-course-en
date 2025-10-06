import { useState } from "react";

export default function StateLogin() {
    const [enteredValues, setEnteredValues] = useState({
        email: "",
        password: "",
    });

    const [didEdit, setDidEdit] = useState({
        email: false,
        password: false,
    });

    const emailIsInvalid = didEdit.email && !enteredValues.email.includes("@");

    function handleInputChange(event) {
        const { name, value } = event.target;
        console.log("Name: " + name);
        console.log("Value: " + value);
        setEnteredValues(prevState => ({ ...prevState, [name]: value }));
        setDidEdit(prevState => {
            return { ...prevState, [name]: false };
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Entered Email: " + enteredValues.email);
    }

    function handleInputBlur(event) {
        const { name } = event.target;
        setDidEdit(prevState => {
            return { ...prevState, [name]: true };
        });
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
                        onBlur={event => {
                            handleInputBlur(event);
                        }}
                        onChange={handleInputChange}
                        value={enteredValues.email}
                    />
                    <div className={"control-error"}>
                        {emailIsInvalid && <p>Please enter a valid email address</p>}
                    </div>
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
