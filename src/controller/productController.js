import { ProductService } from "../service/productService.js";
import productSchema from "../schema/db/productSchema.js";
const productService = new ProductService();

class ProductController {
  constructor(productService) {
    this.productService = productService;
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productService.getAllProducts();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async createProduct(req, res) {
    const owner = req.auth.id
    // Vérifier si un fichier a été uploadé
    if (!req.file) {
      return res.status(400).json({ error: "Aucune image n'a été fournie !" });
    }

    const { name, description, price, stock,category } = req.body;

    // Validation des champs
    if (!name || !description || !price) {
      return res
        .status(400)
        .json({ error: "Tous les champs sont obligatoires !" });
    }

    try {
      // Créer un produit avec le chemin de l'image
      const product = await this.productService.createProduct({
        name,
        description,
        price,
        stock,
        owner,
        image: req.file.path, // Chemin de l'image uploadée
        category
        
      });
      console.log(product);
      return res.status(201).json({
        message: "Produit créé avec succès !",
        product,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  async updateProduct(req, res) {
    const productId = req.params.id;
    let data;
    try {
      data = productSchema.parse(req.body);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
    const product = await this.productService.updateProduct(productId, data);
    return res.status(200).json({ message: "Produit mis à jour !" });
  }

  async deleteProduct(req, res) {
    const productId = req.params.id;
    const product = await this.productService.deleteProduct(productId);
    return res.status(200).json({ message: "Produit supprimé !" });
  }
}

export default new ProductController(productService);
