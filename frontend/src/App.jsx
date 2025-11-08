import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [receipt, setReceipt] = useState(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${API_URL}/cart`);
        setCart(res.data);
      } catch (err) {
        console.error("Error fetching cart:", err);
      }
    };
    fetchCart();
  }, []);

  const handleAddToCart = async (productId, quantity) => {
    try {
      await axios.post(`${API_URL}/cart`, { productId, quantity });

      const res = await axios.get(`${API_URL}/cart`);
      setCart(res.data);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await axios.delete(`${API_URL}/cart/${cartItemId}`);
      const res = await axios.get(`${API_URL}/cart`);
      setCart(res.data);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };


  const handleCheckout = async (customerData) => {
    try {
      const res = await axios.post(`${API_URL}/checkout`, { customerData });
      setReceipt(res.data);
      setCart({ items: [], total: 0 }); 
    } catch (err) {
      console.error("Error during checkout:", err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">

      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-center text-indigo-600">
            Vibe Commerce
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Products
        </h2>
        <ProductList products={products} onAddToCart={handleAddToCart} />

        <Cart 
          cart={cart} 
          onRemoveFromCart={handleRemoveFromCart} 
          onCheckout={handleCheckout} 
        />
      </main>

      <CheckoutModal 
        receipt={receipt} 
        onClose={() => setReceipt(null)} 
      />
    </div>
  );
}

export default App;