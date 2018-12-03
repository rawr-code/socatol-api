import Product from "../models/productSchema";

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if (err) res.status(500).send(`Error al realizar la peticion: ${err}`);
    if (!products) res.status(404).send("No existen productos");

    res.status(200).send({ products });
  });
}

export { getProducts };
