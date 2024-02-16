const express = require("express");
const server = express();
const { Product, User } = require("./db_conection");

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
  const allProducts = await Product.findAll({include: User});

  return res.status(200).json(allProducts);
});

server.post("/", async (req, res) => {
  try {
    const { name, price, user } = req.body;

    if (!name && !price)
      return res
        .status(400)
        .send("El nombre y el precio del producto es requerido");

    const user_creator = 1;

    const saveProduct = await Product.build({ name, price, UserId:user == '' ? null : user });
    await saveProduct.save();

    const allProducts = await Product.findAll({ include: User});

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.put("/", async (req, res) => {
  try {
    const { name, price, id, user } = req.body;

    if (!name && !price && !id && !user)
      return res
        .status(400)
        .send("El nombre, el precio y el usuario del producto es requerido");

    const [product] = await Product.findOrCreate({
      where: { idProduct: id },
    });

    product.name = name;
    product.price = price;
    product.UserId = user == '' ? null : user
    await product.save();
    const allProducts = await Product.findAll({include: User});

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.delete("/", async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) return res.status(400).send("El id es requerido");

    const [product] = await Product.findOrCreate({
      where: { idProduct: id },
    });

    if (product.UserId != null) {
      return res
        .status(400)
        .send("No se puede eliminar tiene un usuario asignado");
    }

    await Product.destroy({
      where: { idProduct: id },
    });

    const allProducts = await Product.findAll({include: User});

    res.status(200).json(allProducts);
  } catch (error) {
    res.status(500).json(error);
  }
});

server.get("/users", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = server;
