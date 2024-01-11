const express = require("express");
const productRouter = require("./routes/productRouter");
const db = require("./config/db");
const methodOverride = require("method-override");

const app = express();

//set ejs
// Set 'public' folder as the static folder
app.use(express.static("public"));
app.set("view engine", "ejs");

// Configure method-override middleware
app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//page router home
app.get("/", (req, res) => {
  db.query(
    "SELECT id,product_name,product_category,product_color,product_image,product_description FROM products",
    (err, products) => {
      if (err) {
        console.log(err);
      }
      res.render("index", { products });
    }
  );
});

//routes
app.use("/products", productRouter);

app.listen(3333, () => {
  console.log("app running on port 3333");
});
