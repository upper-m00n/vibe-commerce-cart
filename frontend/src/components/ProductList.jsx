
function ProductList({ products, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map(product => (

        <div 
          key={product._id} 
          className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-48 object-cover"
          />
          

          <div className="p-5 flex flex-col grow">
    
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {product.name}
            </h3>
            <p className="text-lg font-bold text-green-600 mb-4">
              ${product.price.toFixed(2)}
            </p>
        
            <button 
              className="mt-auto w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow-sm transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onClick={() => onAddToCart(product._id, 1)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;