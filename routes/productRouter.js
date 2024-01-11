const express = require("express");
const productRouter = express.Router();
const upload = require("../config/upload");
const {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
} = require("../controllers/productController");
const db = require("../config/db");

//page render router
productRouter.get("/add-product", (req, res) => {
  res.render("addProduct");
});

productRouter.get("/get-update-product-form/:id", (req, res) => {
  db.query(
    "SELECT id,product_name,product_category,product_color,product_image,product_description FROM products WHERE id=?",
    [req.params.id],
    (err, product) => {
      if (err) {
        console.log(err);
      } else {
        res.render("updateProduct", { product: product[0] });
      }
    }
  );
});

productRouter.post("/", upload.single("product_image"), createProduct);
// productRouter.get("/", getAllProducts);
productRouter.delete("/:id", deleteProduct);
productRouter.put("/:id", upload.single("product_image"), updateProduct);

module.exports = productRouter;
