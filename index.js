require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const ValidationsMiddlewares = require('./middlewares/validationsMiddlewares');
const ProductsController = require('./controllers/productsController');
const SalesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ValidationsMiddlewares.validateProducts, ProductsController.create);

app.get('/products/', ProductsController.getAll);

app.get('/products/:id', ProductsController.getById);

app.put('/products/:id',
 ValidationsMiddlewares.validateProducts, ProductsController.updateProducts);

app.delete('/products/:id', ProductsController.deleteProducts);

app.post('/sales', ValidationsMiddlewares.validateSales, SalesController.create);

app.get('/sales/', SalesController.getAll);

app.get('/sales/:id', SalesController.saleById);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
