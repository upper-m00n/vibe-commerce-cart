const CartItem = require('../models/CartItem')
const Product= require('../models/Product')
const getCartItems = async (req,res)=>{
    try {
        const cartItems = await CartItem.find().populate('product');
        
        const total = cartItems.reduce((sum, item) => {
        return sum + (item.product.price * item.quantity);
        }, 0);

        res.json({ items: cartItems, total: total.toFixed(2) });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
}

const addCartItem = async (req,res)=>{
    const { productId, quantity } = req.body;

  if (!productId || !quantity || quantity < 1) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cartItem = await CartItem.findOne({ product: productId });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new CartItem({
        product: productId,
        quantity: quantity,
      });
      await cartItem.save();
    }
    
    const populatedItem = await CartItem.findById(cartItem._id).populate('product');
    res.status(201).json(populatedItem);

  } catch (err) {
    res.status(500).json({ message: 'Error adding to cart' });
  }
}

const deleteCartItem = async (req,res)=>{
    try {
        const cartItem = await CartItem.findByIdAndDelete(req.params.id);
        if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
        }
        res.json({ message: 'Item removed from cart' });
  } catch (err) {
        res.status(500).json({ message: 'Error removing from cart' });
  }
}

module.exports={deleteCartItem,getCartItems,addCartItem};
