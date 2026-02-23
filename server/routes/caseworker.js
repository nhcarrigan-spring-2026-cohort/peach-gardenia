const { formValidation } = require("../helpers/formValidation")
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')
const { AccountRequest } = require("../db/models/account_requests");

router.use(express.urlencoded({ extended: true }))
router.use(express.json())


//Caseworker portal where they can sign in or request an account
router
  .get('/', (req, res) => {
    res.send("Welcome to caseworker portal homepage")
  })

  //Route to submit login information
  .post('/', (req, res) => {
    res.send("Caseworker is now logged in")
  })

  //Caseworker contact form - get route
  .get('/form', (req, res) => {
    res.send("Contact form for caseworkers to sign up")
  })

  //Caseworker contact form - post route
  .post('/requestform', async (req, res) => {
    try {
      const validate = formValidation(req.body);
      if (validate) {
        const payload = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phoneNumber: req.body.coutryCode + req.body.phoneNumber,
          email: req.body.email,
          addressLine1: req.body.addressLine1,
          addressLine2: req.body.addressLine2,
          city: req.body.city,
          stateOrCounty: req.body["state/County"],
          zipCode: req.body.zipCode,
          country: req.body.country,

          organisationName: req.body.organisationName,
          organisationPhoneNumber: req.body.orgCountryCode + req.body.orgPhoneNumber,
          organisationEmail: req.body.organisationEmail,
          organisationAddressLine1: req.body.organisationAddressLine1,
          organisationAddressLine2: req.body.organisationAddressLine2,
          organisationCity: req.body.organisationCity,
          organisationStateOrCounty: req.body["organisationState/County"],
          organisationZipCode: req.body.organisationZipCode,
          organisationCountry: req.body.orgCountry,

          additionalInformation: req.body.additionalInfo,
          termsAndConditions: req.body.termsConditions === "yes"
        };

        await AccountRequest.create(payload);
        console.log("Account request saved to the database successfully");
        res.redirect("http://localhost:5173/caseworker/requestform?status=success")
      }
      else {
        res.redirect("http://localhost:5173/caseworker/requestform?status=error")
      }
    } catch (e) {

      res.redirect("http://localhost:5173/caseworker/requestform?status=error")
      console.log("Error adding account request to the AccountRequests Table in the database: " + e.message)
    }
  })

  //All wishlists that are related to caseworker id
  .get('/:id', (req, res) => {
    res.send("Here are all the wishlists made by this caseworker")
  })

  //create a wishlist
  .post('/:id', (req, res) => {
    res.send("New wishlist created")
  })

  //Get one wishlist
  .get('/wishlist/:id', (req, res) => {
    res.send("Viewing one wishlist in caseworker portal")
  })

  //Edit wishlist - GET route to populate fields
  .get('/wishlist/:id/edit', (req, res) => {
    res.send("You're now editing a list")
  })

  //Update wishlist - PUT route
  .put('/wishlist/:id', (req, res) => {
    res.send("Wishlist updated!")
  })

  //delete a wishlist
  .delete('/wishlist/:id', (req, res) => {
    res.send("Wishlist deleted")
  })



module.exports = router