const { Router } = require('express');

const connection = require('../service/connection');

const router = Router();

const OK = 200;

router.get('/', async (_request, response) => {
  try {
    const allMedicines = await connection('products').then((products) => products.find().toArray());
    return response.status(OK).json(allMedicines);
  } catch (err) {
    console.error(err.message);
  }}
);

router.post('/', async (request, response) => {
  console.log('teste');
  return response.status(OK).json({ message: 'teste'});
});

module.exports = router;