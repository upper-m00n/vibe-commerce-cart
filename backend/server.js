const express = require('express')
const cors= require('cors');
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
  const productCount = await Product.countDocuments();
  if (productCount > 0) {
    console.log("Products already seeded.");
    return;
  }

  const mockProducts = [
    { name: 'H&M tshirt', price: 89.99, imageUrl: 'https://tse3.mm.bing.net/th/id/OIP.v9Qiqvac3TU15R1V8u99kgHaHa?pid=Api&P=0&h=180' },
    { name: 'Hrx Jacket', price: 149.99, imageUrl: 'https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/20491886/2022/11/18/3661740c-8083-45ff-97f0-94b810dad3161668747723526-HRX-By-Hrithik-Roshan-Women-Navy-Blue-Solid-Spread-Collar-Ja-1.jpg' },
    { name: 'Baggy Jeans', price: 20.99, imageUrl: 'https://tse1.mm.bing.net/th/id/OIP.qz7dv9MiHgs_szQ949eyVQHaLH?pid=Api&P=0&h=180' },
    { name: 'Nike zShoes', price: 79.99, imageUrl: 'https://tse1.mm.bing.net/th/id/OIP._I9FKUImjVLNJxHULKX9fgHaFb?pid=Api&P=0&h=180' },
    { name: 'Arctic Fox Bagpack',price: 49.99, imageUrl: 'http://cdn.shopify.com/s/files/1/0226/7407/9819/products/ARCTIC_FOX_BACKPACK_TUITION20_Black_front_1200x630.jpg?v=1578650234' },
  ];

  try {
    await Product.insertMany(mockProducts);
    console.log("Database seeded with mock products!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
}