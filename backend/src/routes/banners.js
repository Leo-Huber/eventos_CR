const { Router } = require('express');
let banners = []; 
const router = Router();

router.get('/banners', (_req, res) => res.json(banners));

router.post('/banners', (req, res) => {
  const b = { id: Date.now(), ...req.body };
  banners.push(b);
  res.status(201).json(b);
});

router.delete('/banners/:id', (req, res) => {
  const { id } = req.params;
  banners = banners.filter(b => String(b.id) !== String(id));
  res.status(204).end();
});

module.exports = router;
