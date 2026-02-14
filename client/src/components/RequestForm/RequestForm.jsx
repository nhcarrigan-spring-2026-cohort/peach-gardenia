import './RequestForm.css'
import { FormLabel } from './FormLabel'
import { PhoneField } from './PhoneField'
import { CountrySelect } from './CountrySelect'
import { CheckboxField } from './CheckboxField'
import { TextAreaField } from './TextAreaField'

async function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const caseworkersDetails = JSON.stringify(Object.fromEntries(formData))

    try {
        const response = await fetch('http://localhost:3000/caseworker/requestform', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: caseworkersDetails
        })

        if (!response.ok) {
            throw new Error(`Http error status: ${response.status}`)
        }

        const result = await response.json()
        console.log(result)
    } catch (error) {
        console.error('Error: ', error)
    }
}

export function RequestForm() {
    return (
        <div className="form-wrapper">
            <h2 className="form-title">Caseworker's Request Form</h2>

            <p className="form-intro">
                Thanks for your interest in using our platform. We believe <i>Every kid deserves a birthday gift</i>.
                Therefore, we created this platform to achieve that.
                Please fill in your details below and we shall get back to you as soon as your request has been accepted.
            </p>

            <form aria-describedby="form-intro" method="POST" onSubmit={handleSubmit}>
                
             
                <fieldset>
                    <legend>Personal Information</legend>

                    <FormLabel name="First Name" autoComplete="given-name" required maxLength={50}>
                        <input />
                    </FormLabel>

                    <FormLabel name="Last Name" autoComplete="family-name" required maxLength={50}>
                        <input />
                    </FormLabel>

                    <PhoneField label="Phone Number" />

                    <FormLabel name="Email" autoComplete="email" required maxLength={50}>
                        <input />
                    </FormLabel>

                    <FormLabel name="Address Line 1" autoComplete="address-line1" required>
                        <input />
                    </FormLabel>

                    <FormLabel name="Address Line 2" autoComplete="address-line2">
                        <input />
                    </FormLabel>

                    <FormLabel name="City" autoComplete="address-level2" required maxLength={30}>
                        <input />
                    </FormLabel>

                    <FormLabel name="State / County" autoComplete="address-level1" required maxLength={30}>
                        <input />
                    </FormLabel>

                    <FormLabel name="Zip Code" autoComplete="postal-code" required maxLength={30}>
                        <input />
                    </FormLabel>

                    <CountrySelect />
                </fieldset>

          
                <fieldset>
                    <legend>Organisation Information</legend>

                    <FormLabel name="Organisation Name" autoComplete="organization" required maxLength={50}>
                        <input />
                    </FormLabel>

                    <PhoneField namePrefix="org" label="Organisation Telephone" />

                    <FormLabel name="Organisation Email" autoComplete="email" required>
                        <input />
                    </FormLabel>

                    <FormLabel name="Organisation Address Line 1" autoComplete="address-line1" required>
                        <input />
                    </FormLabel>

                    <FormLabel name="Organisation Address Line 2" autoComplete="address-line2">
                        <input />
                    </FormLabel>

                    <FormLabel name="Organisation City" autoComplete="address-level2" required maxLength={30}>
                        <input />
                    </FormLabel>

                    <FormLabel name="Organisation State / County" autoComplete="address-level1" required maxLength={30}>
                        <input />
                    </FormLabel>

                    <FormLabel name="Organisation Zip Code" autoComplete="postal-code" required maxLength={30}>
                        <input />
                    </FormLabel>

                    <CountrySelect name="orgCountry" label="Organisation Country" />
                </fieldset>

                <TextAreaField
                    label="Additional Information"
                    name="additionalInfo"
                    autoComplete="off"
                />

                <CheckboxField
                    name="termsConditions"
                    required
                    label={
                        <a href="#termandcondition">
                            Please click this link to read the terms of service here
                        </a>
                    }
                />

                <button type="submit">Request Registration</button>
            </form>
        </div>
    )
}
