const express = require('express');
const router = express.Router();

router
  .get('/', (req,res)=>{
    res.send("All wishlists")
  })

  .get('/wishlist/:id', (req,res)=>{
    res.send("Viewing one wishlist")
  })

module.exports = router