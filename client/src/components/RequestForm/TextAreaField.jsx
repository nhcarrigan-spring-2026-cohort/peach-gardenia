
export function TextAreaField({ label, name, autoComplete = "off", required = false, className = "" }) {
    const id = name;
    return (
        <label htmlFor={id} className={className}>
            {label} {required ? "*" : ""}:
            <textarea
                id={id}
                name={name}
                autoComplete={autoComplete}
                required={required}
            />
        </label>
    );
}
