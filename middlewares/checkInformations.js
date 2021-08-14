const connection = require('../service/connection');

const NOT_ACCEPTABLE = 406;
const NOT_FOUND = 404;

const checkBodyInformations = async (request, response, next) => {
  try {
    const { cod, name, description, price, stock } = request.body;
    if (!cod || !name || !description || !price || !stock) {
      return response.status(NOT_ACCEPTABLE).json({ message: 'Invalid information.'});
    }
    next();
  } catch (err) {
    console.error(err.message);
  }
}

const checkBeforeCreate = async (request, response, next) => {
  try {
    const { cod } = request.body;
    const doesTheProductExist = await connection('products').then((products) => products.findOne({ cod }, {}));
    if (doesTheProductExist) {
      return response.status(NOT_FOUND).json({ message: 'The medicine already exists.'})
    }
    next();
  } catch (err) {
    console.error(err.message);
  }
}

const checkBeforeUpdateOrDelete = async (request, response, next) => {
  try {
    const { cod } = request.body;
    const doesTheProductExist = await connection('products').then((products) => products.findOne({ cod }, {}));
    if (!doesTheProductExist) {
      return response.status(NOT_FOUND).json({ message: 'The medicine does not exist.'})
    }
    next();
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = {
  checkBodyInformations,
  checkBeforeUpdateOrDelete,
  checkBeforeCreate
}; 