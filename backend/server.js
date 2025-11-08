const express = require('express')
const cors= require('cors');
const axios = require('axios');
const { default: mongoose } = require('mongoose');
const { getProducts } = require('./controllers/product.controller');
const { getCartItems, addCartItem, deleteCartItem } = require('./controllers/cart.controller');
const { mockCheckout } = require('./controllers/checkout.controller');
const Product = require('./models/Product')

require('dotenv').config()

const app =express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MONGO DB connected")
        app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))
        seedDatabase();
    }
    )
    .catch((err) => console.log(err));

app.get('/', (req,res)=>{
    res.send("API is working");
});

// product api
app.get('/api/products',getProducts);

//cart api
app.get('/api/cart',getCartItems);
app.post('/api/cart',addCartItem);
app.delete('/api/cart/:id',deleteCartItem);

// checkout api
app.get('/api/checkout',mockCheckout);

// seeding
async function seedDatabase() {
  try {
    const productCount = await Product.countDocuments();
    if (productCount > 0) {
      console.log("Products already seeded.");
      return;
    }

    console.log("No products found, fetching from Fake Store API...");

    const response = await axios.get('https://fakestoreapi.com/products?limit=10');
    
    const productsToSeed = response.data.map(product => ({
      name: product.title,
      price: product.price,
      imageUrl: product.image,
    }));

    await Product.insertMany(productsToSeed);
    console.log("Database seeded with 10 products from Fake Store API!");
  
  } catch (err) {
    console.error("Error seeding database:", err.message);
  }
}