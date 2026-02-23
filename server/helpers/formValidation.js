function formValidation (formObject)
{
    if (formObject.firstName && formObject.lastName && formObject.phoneNumber &&
         formObject.email && formObject.termsConditions == "yes")
    {
        return true;
    }
    return false;
}
module.exports = { formValidation };