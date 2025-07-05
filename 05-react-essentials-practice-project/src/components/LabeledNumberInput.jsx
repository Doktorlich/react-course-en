import { useState } from "react";

export default function LabeledNumberInput({ labelText,value,onChange }) {

    return (
        <p>
            <label>{labelText}</label>
            <input
                type="number"
                value={value}
                onChange={onChange}
            />
        </p>
    );
}
