import { getNames } from 'country-list';

const countries = getNames();

export function CountrySelect({ className = "", label = "Country", name = "country", required = true }) {
    return (
        <label className={className}>
            {label} *:
            <select
                name={name}
                autoComplete="country-name"
                required={required}
            >
                <option value="">Select a country</option>
                {countries.map(country => (
                    <option key={country} value={country}>{country}</option>
                ))}
            </select>
        </label>
    );
}
