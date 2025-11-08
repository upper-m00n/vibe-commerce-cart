const CartItem = require('../models/CartItem')

const mockCheckout = async (req,res)=>{
    try {
    
    const cartItems = await CartItem.find().populate('product');
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const receipt = {
      total: total.toFixed(2),
      items: cartItems.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      timestamp: new Date(),
    };

    await CartItem.deleteMany({});

    res.json(receipt);
  } catch (err) {
    res.status(500).json({ message: 'Error during checkout' });
    console.log("error",err)
  }
}

module.exports={mockCheckout};