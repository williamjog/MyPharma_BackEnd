const { Router } = require('express');

const connection = require('../service/connection');

const { checkBodyInformations,
        checkBeforeCreate,
        checkBeforeUpdateOrDelete
      } = require('../middlewares/checkInformations');

const router = Router();

const OK = 200;
const CREATED = 201;

router.get('/search', async (request, response) => {
  const searchTerm = request.query.q;
  const searchTermWithoutPlusSimbols = searchTerm.replace(/\+/g, ' ');
  try {
    const medicineDetailed = await connection('products').then((products) => products.find(
      { apresentacao: { $in: [ new RegExp(searchTermWithoutPlusSimbols, 'i') ] } }).toArray());
    return response.status(OK).json(medicineDetailed);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/product/:cod', async (request, response) => {
  const formatedCod = Number(request.params.cod);
  try {
    const medicineDetailed = await connection('products').then((products) => products.findOne(
      { cod: formatedCod }, {}));
    return response.status(OK).json(medicineDetailed);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/:name/', async (request, response) => {
  try {
    const medicineDetailed = await connection('products').then((products) => products.findOne(
      { nome: request.params.name }, {}));
    return response.status(OK).json(medicineDetailed);
  } catch (err) {
    console.error(err.message);
  }
});

router.get('/', async (_request, response) => {
  try {
    const allMedicines = await connection('products').then((products) => products.find().toArray());
    return response.status(OK).json(allMedicines);
  } catch (err) {
    console.error(err.message);
  }
});

router.post('/', checkBodyInformations, checkBeforeCreate, async (request, response) => {
  try {
    const { cod, name, description, price, stock } = request.body;
    await connection('products').then((products) => products.insertOne(
      { cod, nome: name, apresentacao: description, preco: price, estoque: stock }
    ));
    return response.status(CREATED).json({ message: 'Medicine has been successfully created.'});
  } catch (err) {
    console.error(err.message);
  }
});

router.put('/', checkBodyInformations, checkBeforeUpdateOrDelete, async (request, response) => {
  try {
    const { cod, name, description, price, stock } = request.body;
    await connection('products').then((products) => products.updateOne(
      { cod },
      { $set: { cod, nome: name, apresentacao: description, preco: price, estoque: stock } }
    ))
    return response.status(OK).json({ message: 'Medicine has been successfully edited.'});
  } catch (err) {
    console.error(err.message);
  }
});

router.delete('/', checkBodyInformations, checkBeforeUpdateOrDelete, async (request, response) => {
  try {
    const { cod } = request.body;
    await connection('products').then((products) => products.deleteOne({ cod }));
    return response.status(OK).json({ message: 'Product has been successfully deleted.' }) 
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;