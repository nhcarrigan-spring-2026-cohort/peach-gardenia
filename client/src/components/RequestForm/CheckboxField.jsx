export function CheckboxField({ label, name, value = "yes", required = false, className = "" }) {
    const id = name;

    return (
        <div className={`checkbox-row ${className}`}>
            <input
                id={id}
                name={name}
                type="checkbox"
                value={value}
                required={required}
            />
            <label htmlFor={id}>
                {label}
            </label>
        </div>
    );
}
