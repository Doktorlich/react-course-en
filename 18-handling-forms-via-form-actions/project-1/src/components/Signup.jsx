import { useActionState } from "react";
import { hasMinLength, isNotEmpty, isEmail, isEqualToOtherValue } from "../util/validation.js";

function signupAction(prevState, formData) {
    const enteredEmail = formData.get("email");
    const enteredPassword = formData.get("password");
    const enteredConfirmPassword = formData.get("confirm-password");
    const firstName = formData.get("first-name");
    const lastName = formData.get("last-name");
    const role = formData.get("role");
    const terms = formData.get("terms");
    const acquisitionChanel = formData.getAll("acquisition");
    let errors = [];
    if (!isEmail(enteredEmail)) {
        errors.push("Invalid email address.");
    }
    if (!isNotEmpty(enteredPassword) || !hasMinLength(enteredPassword, 2)) {
        errors.push("You must provide a password with at least six characters.");
    }
    if (!isEqualToOtherValue(enteredPassword, enteredConfirmPassword)) {
        errors.push("Passwords do not match.");
    }
    if (!isNotEmpty(firstName) || !isNotEmpty(lastName)) {
        errors.push("Please provide both your first and last name.");
    }
    if (!isNotEmpty(role)) {
        errors.push("Please select a role.");
    }
    if (!terms) {
        errors.push("You must agree to the terms conditions.");
    }
    if (acquisitionChanel.length === 0) {
        errors.push("Please select an least one acquisition chanel");
    }

    if (errors.length > 0) {
        return {
            errors: errors,
            enteredValues: {
                email: enteredEmail,
                password: enteredPassword,
                confirmPassword: enteredConfirmPassword,
                firstName: firstName,
                lastName: lastName,
                role: role,
                terms: terms,
                acquisitionChanel: acquisitionChanel,
            },
        };
    }

    return {
        errors: null,
    };
}

export default function Signup() {
    const [formState, formAction] = useActionState(signupAction, { errors: null });
    console.log(formState);
    return (
        <form action={formAction}>
            <h2>Welcome on board!</h2>
            <p>We just need a little bit of data from you to get you started 🚀</p>

            <div className="control">
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    defaultValue={formState.enteredValues?.email}
                />
            </div>

            <div className="control-row">
                <div className="control">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        defaultValue={formState.enteredValues?.password}
                    />
                </div>

                <div className="control">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        id="confirm-password"
                        type="password"
                        name="confirm-password"
                        defaultValue={formState.enteredValues?.confirmPassword}
                    />
                </div>
            </div>

            <hr />

            <div className="control-row">
                <div className="control">
                    <label htmlFor="first-name">First Name</label>
                    <input
                        type="text"
                        id="first-name"
                        name="first-name"
                        defaultValue={formState.enteredValues?.firstName}
                    />
                </div>

                <div className="control">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                        type="text"
                        id="last-name"
                        name="last-name"
                        defaultValue={formState.enteredValues?.lastName}
                    />
                </div>
            </div>

            <div className="control">
                <label htmlFor="phone">What best describes your role?</label>
                <select id="role" name="role" defaultValue={formState.enteredValues?.role}>
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="employee">Employee</option>
                    <option value="founder">Founder</option>
                    <option value="other">Other</option>
                </select>
            </div>

            <fieldset>
                <legend>How did you find us?</legend>
                <div className="control">
                    <input
                        type="checkbox"
                        id="google"
                        name="acquisition"
                        value="google"
                        defaultChecked={formState.enteredValues?.acquisitionChanel.includes(
                            "google",
                        )}
                    />
                    <label htmlFor="google">Google</label>
                </div>

                <div className="control">
                    <input
                        type="checkbox"
                        id="friend"
                        name="acquisition"
                        value="friend"
                        defaultChecked={formState.enteredValues?.acquisitionChanel.includes(
                            "friend",
                        )}
                    />
                    <label htmlFor="friend">Referred by friend</label>
                </div>

                <div className="control">
                    <input
                        type="checkbox"
                        id="other"
                        name="acquisition"
                        value="other"
                        defaultChecked={formState.enteredValues?.acquisitionChanel.includes(
                            "other",
                        )}
                    />
                    <label htmlFor="other">Other</label>
                </div>
            </fieldset>

            <div className="control">
                <label htmlFor="terms-and-conditions">
                    <input
                        type="checkbox"
                        id="terms-and-conditions"
                        name="terms"
                        defaultChecked={formState.enteredValues?.terms}
                    />
                    I agree to the terms and conditions
                </label>
            </div>
            {formState.errors && (
                <ul className={"error"}>
                    {formState.errors.map(error => (
                        <li key={error}>{error}</li>
                    ))}
                </ul>
            )}
            <p className="form-actions">
                <button type="reset" className="button button-flat">
                    Reset
                </button>
                <button className="button">Sign up</button>
            </p>
        </form>
    );
}
