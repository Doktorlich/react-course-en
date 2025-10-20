export default function Button({ children, textOnly, className, ...props }) {
    const cssClasses = textOnly ? "text-button" : "button";
    return (
        <button {...props} className={`${cssClasses} ${className}`}>
            {children}
        </button>
    );
}
