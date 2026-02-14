import { getCountries, getCountryCallingCode } from 'libphonenumber-js'
import metadata from 'libphonenumber-js/metadata.full.json';

const phoneCountries = getCountries();

export function PhoneField({ className = "", label = "Phone Number", namePrefix = "" }) {
    const codeName = namePrefix ? `${namePrefix}CountryCode` : "countryCode";
    const numberName = namePrefix ? `${namePrefix}PhoneNumber` : "phoneNumber";

    return (
        <label className={className}>
            {label} *:
            <div className="phone-field">
                <select
                    name={codeName}
                    autoComplete="tel-country-code"
                    required
                >
                    <option value="">Code</option>
                    {phoneCountries.map(code => (
                        <option key={code} value={`+${getCountryCallingCode(code, metadata)}`}>
                            +{getCountryCallingCode(code, metadata)} ({code})
                        </option>
                    ))}
                </select>

                <input
                    name={numberName}
                    type="tel"
                    autoComplete="tel-national"
                    required
                />
            </div>
        </label>
    );
}
