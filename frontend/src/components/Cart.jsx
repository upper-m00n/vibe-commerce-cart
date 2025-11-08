import React, { useState } from 'react';

function Cart({ cart, onRemoveFromCart, onCheckout }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitCheckout = (e) => {
    e.preventDefault();
    onCheckout(formData);
    setShowCheckout(false); 
    setFormData({ name: '', email: '' });
  };

  const btnBase = "py-2 px-4 font-semibold rounded-md shadow-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const btnPrimary = `${btnBase} w-full bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500`;
  const btnDanger = `${btnBase} bg-red-600 text-white hover:bg-red-700 focus:ring-red-500`;

  const inputBase = "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Cart</h2>
      
      {cart.items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="divide-y divide-gray-200">
            {cart.items.map(item => (
              <div key={item._id} className="flex justify-between items-center py-4">
                <div>
                  <h4 className="text-lg font-medium text-gray-800">{item.product.name}</h4>
                  <p className="text-sm text-gray-600">
                    ${item.product.price.toFixed(2)} x {item.quantity} = {' '}
                    <strong className="font-bold text-gray-800">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </strong>
                  </p>
                </div>
                <button 
                  className={btnDanger}
                  onClick={() => onRemoveFromCart(item._id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 text-right">
            <p className="text-2xl font-bold text-gray-800">
              Total: ${cart.total}
            </p>
          </div>

          <button 
            className={`${btnPrimary} mt-6`}
            onClick={() => setShowCheckout(!showCheckout)}
          >
            {showCheckout ? 'Cancel' : 'Proceed to Checkout'}
          </button>

          {showCheckout && (
            <form className="mt-6 space-y-4" onSubmit={handleSubmitCheckout}>
              <h3 className="text-xl font-semibold text-gray-700">Checkout</h3>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  name="name" 
                  placeholder="Your name" 
                  className={inputBase}
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="email"
                  name="email" 
                  placeholder="your mail address" 
                  className={inputBase}
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <button className={btnPrimary} type="submit">
                Complete Purchase
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;