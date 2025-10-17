export function isNotEmpty(value) {
    return value.trim() !== "";
}

export function hasMinLength(value, minLength) {
    return value.trim().length >= minLength;
}
export function isEmail(email) {
    return email.trim().includes("@");
}
