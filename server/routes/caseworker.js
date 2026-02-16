const express = require('express');
const router = express.Router();
const db = require('../db/database');


router.use(express.urlencoded({ extended: true }))
router.use(express.json())


//Caseworker portal where they can sign in or request an account
router
  .get('/', (req,res)=>{
    res.send("Welcome to caseworker portal homepage")
  })

//Route to submit login information
  .post('/', (req,res)=>{
    res.send("Caseworker is now logged in")
  })

//Caseworker contact form - get route
  .get('/form', (req, res)=>{
    res.send("Contact form for caseworkers to sign up")
  })

//Caseworker contact form - post route
  .post('/form', (req,res)=>{
    res.send("Account request submitted")
  })

  //All wishlists that are related to caseworker id
  .get('/:id', (req,res)=>{
    res.send("Here are all the wishlists made by this caseworker")
  })

  //create a wishlist
  .post('/:id', async (req, res) => {
    try {
      const caseworkerId = parseInt(req.params.id, 10);

      if (!Number.isInteger(caseworkerId)) {
        return res.status(400).json({ error: 'Invalid caseworker id' });
      }

      const { title, description } = req.body;
      let { goal_amount, accepting_donations } = req.body;

      // basic validation
      if (!title || goal_amount === undefined || goal_amount === null) {
        return res.status(400).json({ error: 'Missing required fields: title, goal_amount' });
      }

      goal_amount = parseFloat(goal_amount);
      if (!Number.isFinite(goal_amount) || goal_amount <= 0) {
        return res.status(400).json({ error: 'Invalid goal_amount; must be a positive number' });
      }

      if (typeof accepting_donations === 'string') {
        accepting_donations = accepting_donations.toLowerCase() === 'true';
      } else {
        accepting_donations = accepting_donations !== undefined ? Boolean(accepting_donations) : true;
      }

      const result = await db.query(
        `
        INSERT INTO wishlists 
          (title, description, goal_amount, accepting_donations, caseworker_id, created_at)
        VALUES 
          ($1, $2, $3, $4, $5, NOW())
        RETURNING id, title, description, goal_amount, accepting_donations, caseworker_id, created_at
        `,
        [title, description || null, goal_amount, accepting_donations, caseworkerId]
      );

      const created = result.rows[0];
      if (created && created.id) {
        res.location(`/wishlists/${created.id}`);
      }

      res.status(201).json({ message: 'Wishlist created successfully', data: created });
    } catch (err) {
      console.error('Create wishlist error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  })


  //Get one wishlist
  .get('/wishlist/:id', (req,res)=>{
   res.send("Viewing one wishlist in caseworker portal") 
  })

  //Edit wishlist - GET route to populate fields
  .get('/wishlist/:id/edit', (req,res)=>{
    res.send("You're now editing a list")
  })

//Update wishlist - PUT route
  .put('/wishlist/:id', (req,res)=>{
    res.send("Wishlist updated!")
  })

//delete a wishlist
  .delete('/wishlist/:id', (req,res)=>{
    res.send("Wishlist deleted")
  })



module.exports = router