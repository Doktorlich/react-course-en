export function hasMinLength(value, minLength) {
    return value.length >= minLength;
}

export function isNotEmpty(value) {
    return value.trim() !== "";
}
