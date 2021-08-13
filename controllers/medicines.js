const { Router } = require('express');

const connection = require('../service/connection');

const { checkInformation } = require('../middlewares/checkInformations');

const router = Router();

const OK = 200;
const CREATED = 201;

router.get('/', async (_request, response) => {
  try {
    const allMedicines = await connection('products').then((products) => products.find().toArray());
    return response.status(OK).json(allMedicines);
  } catch (err) {
    console.error(err.message);
  }}
);

router.get('/:name/', async (request, response) => {
  try {
    const medicineDetailed = await connection('products').then((products) => products.findOne(
      { nome: request.params.name }, {}));
    return response.status(OK).json(medicineDetailed);
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/', checkInformation, async (request, response) => {
  try {
    const { cod, name, description, price, stock } = request.body;
    await connection('products').then((products) => products.insertOne(
      { cod, nome: name, descricao: description, preco: price, estoque: stock }
    ));
    return response.status(CREATED).json({ message: 'Medicine has been successfully created.'});
  } catch (err) {
    console.error(err.message);
  }
});

router.put('/', checkInformation, async (request, response) => {
  try {
    const { cod, name, description, price, stock } = request.body;
    await connection('products').then((products) => products.updateOne(
      { cod },
      { $set: { cod, nome: name, descricao: description, preco: price, estoque: stock } }
    ))
    return response.status(OK).json({ message: 'Medicine has been successfully edited.'});
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;