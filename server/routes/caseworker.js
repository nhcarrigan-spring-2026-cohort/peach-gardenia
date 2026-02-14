const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer')

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
  .post('/requestform', (req, res) => {
    console.log(req.body)
    /*const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
})

    const emailText = `
New Caseworker Registration Request:

Name: ${req.body.firstName} ${req.body.lastName}
Phone: ${req.body.phoneNumber}
Email: ${req.body.email}

Organisation:
${req.body.orgName}
${req.body.orgAddress1}
${req.body.orgCity}, ${req.body.orgCounty}
${req.body.orgCountry}

Additional Info:
${req.body.additionalInfo || "None"}
`
await transporter.sendMail({
  from: '"Peach Gardenia" <admin@peachgardenia.com>',
  to: 'placeholder_email@peachgardenia.com',
  subject: 'New Caseworker Registartion Request',
  text: emailText
}) */
    res.json({ message: "Account creation request recieved" })
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