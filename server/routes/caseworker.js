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
  .post ('/requestform', async (req, res) => {
    try {
      const validate = formValidation(req.body);
    if (validate)
    {
      await AccountRequest.create(req.body);
      res.redirect("http://localhost:5173/caseworker/requestform?status=success")
    } 
    else {
      res.redirect("http://localhost:5173/caseworker/requestform?status=error")
    } 
  } catch (e) {
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