import React from 'react';

function CheckoutModal({ receipt, onClose }) {
  if (!receipt) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 transition-opacity duration-300" 
      onClick={onClose}
    >

      <div 
        className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6 space-y-4" 
        onClick={e => e.stopPropagation()} 
      >
        <h2 className="text-2xl font-bold text-green-600">Checkout Successful!</h2>
        <p className="text-gray-700">Thank you for your purchase.</p>


        <div className="border-t border-gray-200 pt-4 space-y-2">
          <h3 className="text-xl font-semibold text-gray-800">Receipt</h3>
          <p className="text-lg font-bold text-gray-900">
            Order Total: ${receipt.total}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Date:</strong> {new Date(receipt.timestamp).toLocaleString()}
          </p>
          
          <h4 className="font-semibold text-gray-800 pt-2">Items:</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-600">
            {receipt.items.map((item, index) => (
              <li key={index}>
                {item.name} (x{item.quantity}) - ${item.price.toFixed(2)} each
              </li>
            ))}
          </ul>
        </div>

        <button 
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CheckoutModal;