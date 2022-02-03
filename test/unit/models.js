const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const ProductsModel = require('../../models/productsModel');
const SalesModel = require('../../models/salesModel');

describe('Testes em ProductsModel', () => {
  const products = [{
    name: "computador",
    quantity: 42
  }];

  before(() => {
    const execute = [{
      insertId: 1
    }];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('quando produto é cadastrado com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await ProductsModel.create(products);

      expect(response).to.be.a('object');
    });

    it('tal produto possui o "id" do novo produto inserido', async () => {
      const response = await ProductsModel.create(products);

      expect(response).to.have.a.property('id');
    });
  });
});

describe('lista todos os produtos', () => {
  describe('quando não existe nenhum produto na lista', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([
        []
      ]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array vazio', async () => {
      const response = await ProductsModel.getAll();

      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });
  });
});

describe('quando existe produtos criados', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves([
      [{
        "id": 1,
        "name": "computador",
        "quantity": 10
      }],
    ]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('retorna um array com a lista de produtos', async () => {
    const response = await ProductsModel.getAll();

    expect(response).to.be.an('array');
    expect(response).to.be.not.empty;
  });

  it('tais produtos possui as propriedades: "id", "name" e "quantity"', async () => {
    const [product] = await ProductsModel.getAll();

    expect(product).to.be.include.all.keys(
      "id",
      "name",
      "quantity",
    );
  });
  it('procura o produto pelo nome', async () => {
    const response = await ProductsModel.getByName('Martelo de Thor');
    console.log(response);
    expect(response).to.be.an('object');
  });
});

describe('Verifica produto por ID', async () => {
  const product = [[{
    "id": 1,
    "name": "computador",
    "quantity": 42
  }]];

  const ID_PRODUCT = 1;

  before(() => {
    sinon.stub(connection, 'execute').resolves(product);
  });

  after(() => {
    connection.execute.restore();
  });

  it('procura produto por ID', async() => {
    const response = await ProductsModel.getById(ID_PRODUCT);
    expect(response).to.be.a('object');
    expect(response).to.have.property('id');
  })
})


describe('Testes em SalesModel', () => {
  const sale = [{
    "saleId": 1,
    "date": "2021-09-09 00:45:23",
    "product_id": 1,
    "quantity": 10
  }];

  before(() => {
    const execute = sale;

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('Quando a venda é cadastrada com sucesso', async () => {
    it('retorna um array de objetos', async () => {
      const response = await SalesModel.getAll();
      expect(response).to.be.an('object');
    });

    it('tal objeto possui um "id" da nova venda cadastrada', async () => {
      const response = await SalesModel.create();
      expect(response).to.have.a.property('id');
    });
  });
});

describe('Consulta todas as vendas do BD', () => {
  describe('quando não existe uma venda criada', () => {

    before(() => {
      sinon.stub(connection, 'execute').resolves([
        []
      ]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array quando houver uma venda', async () => {
      const response = await SalesModel.getAll();
      expect(response).to.be.an('array');
    });

    it("retorna um array vazio quando não houver venda", async () => {
      const response = await SalesModel.getAll();
      expect(response).to.be.empty;
    });
  });
});

describe("quando existe vendas criadas", () => {
  before(() => {
    sinon.stub(connection, "execute").resolves([
      [{
          "saleId": 1,
          "date": "2022-02-03T04:54:29.000Z",
          "product_id": 1,
          "quantity": 2
        },
        {
          "saleId": 1,
          "date": "2022-02-03T04:54:29.000Z",
          "product_id": 2,
          "quantity": 4
        },
      ],
    ]);
  });

  after(() => {
    connection.execute.restore();
  });

  it("retorna um array com as vendas", async () => {
    const response = await SalesModel.getAll();

    expect(response).to.be.an("array");
    expect(response).to.be.not.empty;
  });

  it('tais vendas possui as propriedades: "saleId", "date", "product_id" e "quantity"', async () => {
    const [item] = await SalesModel.getAll();
    expect(item).to.include.all.keys(
      "saleId",
      "date",
      "product_id",
      "quantity"
    );
  });
});
