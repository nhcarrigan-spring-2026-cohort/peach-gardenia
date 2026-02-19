const express = require('express');
const router = express.Router();
const db = require('../db/database');

router.get('/', async (req, res) => {
  try {
    let page = parseInt(req.query.page, 10);
    let limit = parseInt(req.query.limit, 10);

    if (!Number.isFinite(page) || page < 1) page = 1;
    if (!Number.isFinite(limit) || limit < 1) limit = 20;

    const MAX_LIMIT = 100;
    if (limit > MAX_LIMIT) limit = MAX_LIMIT;

    const offset = (page - 1) * limit;

    const result = await db.query(
      `
      SELECT *
      FROM wishlists
      WHERE accepting_donations = true
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    );

    const totalResult = await db.query(
      `
      SELECT COUNT(*)::int AS total
      FROM wishlists
      WHERE accepting_donations = true
      `
    );

    const total = totalResult.rows[0] && typeof totalResult.rows[0].total === 'number'
      ? totalResult.rows[0].total
      : Number(totalResult.rows[0] && totalResult.rows[0].count) || 0;

    res.status(200).json({
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit))
      }
    });
  } catch (err) {
    console.error('Wishlist fetch error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;