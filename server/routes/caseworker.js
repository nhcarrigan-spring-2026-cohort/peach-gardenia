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

// Update wishlist — atomic ownership-checked update with validation
.put('/wishlist/:id', async (req, res) => {
  try {
    const wishlistId = parseInt(req.params.id, 10);
    const caseworkerId = parseInt(req.body.caseworker_id, 10); // temp until auth middleware

    if (!Number.isInteger(wishlistId) || !Number.isInteger(caseworkerId)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    const { title, description } = req.body;
    let { goal_amount, accepting_donations } = req.body;

    // Build dynamic update
    const fields = [];
    const values = [];
    let idx = 1;

    if (title !== undefined) {
      fields.push(`title = $${idx++}`);
      values.push(title);
    }

    if (description !== undefined) {
      fields.push(`description = $${idx++}`);
      values.push(description);
    }

    if (goal_amount !== undefined) {
      const amount = parseFloat(goal_amount);
      if (!Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({ error: 'Invalid goal_amount' });
      }
      fields.push(`goal_amount = $${idx++}`);
      values.push(amount);
    }

    if (accepting_donations !== undefined) {
      if (typeof accepting_donations === 'string') {
        accepting_donations = accepting_donations.toLowerCase() === 'true';
      } else {
        accepting_donations = Boolean(accepting_donations);
      }
      fields.push(`accepting_donations = $${idx++}`);
      values.push(accepting_donations);
    }

    if (fields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    // Optionally set updated_at
    fields.push(`updated_at = NOW()`);

    const query = `
      UPDATE wishlists
      SET ${fields.join(', ')}
      WHERE id = $${idx} AND caseworker_id = $${idx + 1}
      RETURNING id, title, description, goal_amount, accepting_donations, caseworker_id, created_at, updated_at
    `;

    values.push(wishlistId, caseworkerId);

    const result = await db.query(query, values);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Wishlist not found or not authorized' });
    }

    res.status(200).json({
      message: 'Wishlist updated successfully',
      data: result.rows[0]
    });

  } catch (err) {
    console.error('Update wishlist error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


// delete a wishlist (soft delete) — atomic ownership-checked update
.delete('/wishlist/:id', async (req, res) => {
  try {
    const wishlistId = parseInt(req.params.id, 10);
    const caseworkerId = parseInt(req.body.caseworker_id, 10); // temporary until auth middleware exists

    if (!Number.isInteger(wishlistId) || !Number.isInteger(caseworkerId)) {
      return res.status(400).json({ error: 'Invalid id' });
    }

    // Atomic update: only updates if id matches and owner matches
    const result = await db.query(
      `
      UPDATE wishlists
      SET accepting_donations = false
      WHERE id = $1 AND caseworker_id = $2
      RETURNING id, title, accepting_donations
      `,
      [wishlistId, caseworkerId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Wishlist not found or not authorized' });
    }

    res.status(200).json({
      message: 'Wishlist deleted (disabled)',
      data: result.rows[0]
    });

  } catch (err) {
    console.error('Delete wishlist error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router