
async function handleSubmit (event)
{
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const caseworkersDetails = JSON.stringify(Object.fromEntries(formData));
    try {
        const response = await fetch('http://localhost:3000/caseworker/requestform', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: caseworkersDetails
        });

        if (!response.ok) {
            throw new Error(`Http error status: ${response.status}`)
        }
        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error('Error: ', error);
    }
}
export function RequestForm ()
{

    return (
        <div className="form-wrapper">
            <h3 className="form-title">Caseworker's Request Form</h3>
            <p className="form-paragraph">Thanks for your interest in using our platform. We believe <i>Every kind deserves a birthday gift</i>. We therefore created this platform to achieve that. Please fill in your details below and we shall get back to you as soon as your request's been accepted</p>
            <form method="POST" onSubmit={(e) => handleSubmit(e)}>
                <fieldset>
                    <legend>Personal Information</legend>
                    <label htmlFor="first-name">First Name: 
                        <input id="first-name" type="text" name="firstName" required maxLength={50}/>
                    </label>
                    <label htmlFor="last-name">Last Name: 
                        <input id="last-name" type="text" name="lastName" required maxLength={50} />
                    </label>
                    <label htmlFor="phone-number">Phone Number:
                        <input id="phone-number" name="phoneNumber" type="text" required maxLength={20} />
                    </label>
                    <label htmlFor="email">Email:
                        <input id="email" name="email" type="email" required />
                    </label>
                    <label htmlFor="org-address-1">Address Line 1:
                        <input id="address-1" name="address1" type="text" required />
                    </label>
                    <label htmlFor="address-2">Address Line 2:
                        <input id="address-2" name="address2" type="text" />
                    </label>
                    <label htmlFor="city">City:
                        <input id="city" name="city" type="text" required maxLength={30} />
                    </label>
                    <label htmlFor="county">State/County:
                        <input id="county" name="county" type="text" required maxLength={30} />
                    </label>
                    <label htmlFor="zip-code">Zip Code:
                        <input id="zip-code" name="zipCode" type="text" required maxLength={30} />
                    </label>
                    <label htmlFor="country">Country:
                        <input id="country" name="country" type="text" required maxLength={30} />
                    </label>
                </fieldset>
                <fieldset>
                    <legend>Organisation Information</legend>
                    <label htmlFor="org-name">Name:
                        <input id="org-name" type="text" name="orgName" required maxLength={50}/>
                    </label>
                     <label htmlFor="org-tel">Telephone:
                        <input id="org-tel" name="orgTel" type="text" required maxLength={20} />
                    </label>
                    <label htmlFor="org-email">Email:
                        <input id="org-email" name="orgEmail" type="email" required />
                    </label>
                    <label htmlFor="org-address-1">Address Line 1:
                        <input id="org-address-1" name="orgAddress1" type="text" required />
                    </label>
                    <label htmlFor="org-address-2">Address Line 2:
                        <input id="org-address-2" name="orgAddress2" type="text"/>
                    </label>
                    <label htmlFor="org-city">City:
                        <input id="org-city" name="orgCity" type="text" required maxLength={30} />
                    </label>
                    <label htmlFor="org-county">State/County:
                        <input id="org-county" name="orgCounty" type="text" required maxLength={30} />
                    </label>
                    <label htmlFor="org-zip-code">Zip Code:
                        <input id="org-zip-code" name="orgZipCode" type="text" required maxLength={30} />
                    </label>
                    <label htmlFor="org-country">Country:
                        <input id="org-country" name="orgCountry" type="text" required maxLength={30} />
                    </label>
                </fieldset>
                <label htmlFor="additional-info">Any Other Info You'd Like to Add?
                    <textarea id="additional-info" name="additionalInfo"></textarea>
                </label>
                <label htmlFor="terms-conditions">
                    <input id="terms-conditions" name="termsConditions" type="checkbox" required />
                    <a href="#termandcondition">Terms and Condition</a>
                </label>
                <button type="submit">Request Registration</button>
            </form>
        </div>
    )
}