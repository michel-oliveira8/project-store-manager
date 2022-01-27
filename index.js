require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const ProductsMiddlewares = require('./middlewares/productsMiddlewares');
const ProductsController = require('./controllers/productsController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', ProductsMiddlewares.validateProducts, ProductsController.create);

// app.post('/products', ProductsController.create);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
