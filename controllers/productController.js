const db = require("../config/db");
const fs = require("fs");

const createProduct = (req, res) => {
  const { product_name, product_category, product_color, product_description } =
    req.body;
  db.query(
    "INSERT INTO products (product_name,product_category,product_color,product_image,product_description) VALUES (?,?,?,?,?)",
    [
      product_name,
      product_category,
      product_color,
      req.file.filename,
      product_description,
    ],
    (err, result) => {
      if (err) {
        res.json({ err });
      }
      res.redirect("/");
    }
  );
};

const getAllProducts = (req, res) => {
  db.query(
    "SELECT product_name,product_category,product_color,product_image,product_description FROM products ",
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);

      res.render("index", { products: result });
    }
  );
};

const deleteProduct = (req, res) => {
  db.query(
    "DELETE FROM products WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log("error in deleting a product");
      } else {
        res.redirect("/");
      }
    }
  );
};

const updateProduct = (req, res) => {
  const { product_name, product_category, product_color, product_description } =
    req.body;

  let oldImagePath;

  db.query(
    "SELECT * FROM products WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (req.file) {
          oldImagePath = `public/uploads/${result[0].product_image}`;
          fs.unlinkSync(oldImagePath, (err) => {});
        }
      }
    }
  );

  const updateQuery =
    "UPDATE products SET product_name=?,product_category=?,product_color=?,product_image=?,product_description=? WHERE id = ?";
  db.query(
    updateQuery,
    [
      product_name,
      product_category,
      product_color,
      req.file ? req.file.filename : oldImagePath,
      product_description,
      req.params.id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    }
  );
};

module.exports = {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
};
