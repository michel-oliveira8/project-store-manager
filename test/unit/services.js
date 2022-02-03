const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../models/productsModel');
const ProductsService = require('../../services/productsService');
const SalesModel = require('../../models/salesModel');
const SalesServices = require('../../services/salesService');

describe('Teste em ProductServices', () => {
  describe('lista todos os produtos', async () => {
    const listProducts = [{
        "id": 1,
        "name": "computador",
        "quantity": 42
      },
      {
        "id": 2,
        "name": "notebook",
        "quantity": 42
      },
    ];

    before(() => {
      const execute = listProducts;

      sinon.stub(ProductsModel, 'getAll').resolves(execute);
    });

    after(() => {
      ProductsModel.getAll.restore();
    });

    it('lista todos os produtos da loja em array de objetos', async () => {
      const response = await ProductsService.getAll()
      expect(response).to.be.an('array');
    });

    it('tal produto possui as propriedades: "id", "name", "quantity"', async () => {
        const [item] = await ProductsService.getAll();
        expect(item).to.include.all.keys(
            "id",
            "name",
            "quantity"
        );
    });
  });
});


describe('pesquisar produto por ID', async () => {
  const product = {
    "id": 1,
    "name": "computador",
    "quantity": 42
  }

  const ID_PRODUCT = 1;

  before(() => {
    sinon.stub(ProductsModel, 'getById').resolves(product);
  });

  after(() => {
    ProductsModel.getById.restore();
  })

  it('tal objeto possui um "id" do produto', async () => {
    const response = await ProductsService.getById(ID_PRODUCT);
    expect(response).to.an('object');
  });
});

describe('Teste em SalesServices', async () => {
    describe('listar todas as vendas', async () => {
        const salesList = [
            {
                "saleId": 1,
                "date": "2022-02-03T22:20:54.000Z",
                "product_id": 1,
                "quantity": 3
            },
            {
                "saleId": 2,
                "date": "2022-02-03T22:20:59.000Z",
                "product_id": 2,
                "quantity": 3
            },
        ];

        before(() => {
            const execute = salesList;

            sinon.stub(SalesModel, 'getAll').resolves(execute);
        });

        after(() => {
            SalesModel.getAll.restore();
        });

        describe('Listar todas as vendas efetudas', async () => {
            it('retorna um array de objetos', async () => {
                const response = await SalesServices.getAll();
                expect(response).to.be.an('array');
            });
            it('tal venda possui as propriedades: "saleId","date", "product_id" e "quantity"', async () => {
                const [sale] = await SalesServices.getAll();
                expect(sale).to.include.all.keys(
                    "saleId",
                    "date",
                    "product_id",
                    "quantity"
                );
            });
        });
    });
});
