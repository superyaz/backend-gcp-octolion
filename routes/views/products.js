const express = require("express");
const images = require("../../lib/images");
const bodyParser = require("body-parser");

const router = express.Router();

// Automatically parse request body as form data
router.use(bodyParser.urlencoded({ extended: false }));

const ProductsService = require("../../services/products");

const productService = new ProductsService();

router.get("/", async function(req, res, next) {
  const { tags } = req.query;
  try {
    const products = await productService.getProducts({ tags });
    res.render("products", { products });
  } catch (err) {
    next(err);
  }
});

router.get("/add", (req, res) => {
  res.render("form", {
    product: {}
  });
});

router.post(
  "/add",
  images.multer.single("image"),
  images.sendUploadToGCS,
  async (req, res, next) => {
    const { body: product } = req;
    console.log(product);
    try {
      if (req.file && req.file.cloudStoragePublicUrl) {
        product.image = req.file.cloudStoragePublicUrl;
      }

      const createdProduct = await productService.createProduct({ product });

      res.redirect(`${req.baseUrl}`);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
