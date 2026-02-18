import './RequestForm.css'
import { FormLabel } from './FormLabel'
import { PhoneField } from './PhoneField'
import { CountrySelect } from './CountrySelect'
import { CheckboxField } from './CheckboxField'
import { TextAreaField } from './TextAreaField'
import { useState } from 'react'
import { useEffect } from 'react'


export function RequestForm() {

    const [confirmationMessage, setconfirmationMessage] = useState("")
    const [status, setStatus] = useState("")
    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const s = params.get("status")

        if (!s)
            return;

        setStatus(s)
        if (s == "success") {
            setconfirmationMessage("Your request has been submitted and will be reviewed. We'll get back to you as soon as a decision has been made. Thanks")
        }
        else if (s == "error") {
            setconfirmationMessage("An error occour while processing your request. Please ensure all fields are entered correctly.")
        }
    }, [])



    return (
        <div className="form-wrapper">
            {confirmationMessage && <div className={`confirmationMessage ${
      status === "success" ? "success" : "error"
    }`}>
                {confirmationMessage}
                <button onClick={() => setconfirmationMessage("")}>Dismiss</button>
            </div>}
            <h2 className="form-title">Caseworker's Request Form</h2>

            <p className="form-intro">
                Thanks for your interest in using our platform. We believe <i>Every kid deserves a birthday gift</i>.
                Therefore, we created this platform to achieve that.
                Please fill in your details below and we shall get back to you as soon as your request has been accepted.
            </p>

            <form aria-describedby="form-intro" method="POST" action="http://localhost:3000/caseworker/requestform">


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
