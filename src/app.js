const express = require("express");
const server = express();
const { Product } = require("./db_conection");

server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use(express.json());

server.get("/", async (req, res) => {
  const allProducts = await Product.findAndCountAll();

  return res.status(200).json(allProducts);
});

server.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;

    if (!name && !price)
      return res
        .status(404)
        .send("El nombre y el precio del producto es requerido");

    const user_creator = 1;

    const saveProduct = await Product.build({ name, price, user_creator });
    await saveProduct.save();

    res.status(200).send("El producto se guardo correctamente");
  } catch (error) {
    res.status(500).json(error);
  }
});

server.put("/", async (req, res) => {
  try {
    const { name, price, id } = req.body;

    if (!name && !price && !id)
      return res
        .status(404)
        .send("El nombre y el precio del producto es requerido");

    const user_creator = 1;

    const [product] = await Product.findOrCreate({
      where: { idProduct: id },
    });

    product.name = name;
    product.price = price;
    await product.save();
    const allProducts = await Product.findAll();

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.delete("/", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) return res.status(404).send("El id es requerido");

    const [product] = await Product.findOrCreate({
      where: { idProduct: id },
    });

    if (product.user_creator != null) {
      return res
        .status(404)
        .send("No se puede eliminar tiene un usuario asignado");
    }

    await Product.destroy({
      where: { idProduct: id },
    });

    const allProducts = await Product.findAll();

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = server;
