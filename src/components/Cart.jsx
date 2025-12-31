import { useState } from 'react'
import { FaTimes, FaPlus, FaMinus, FaTrash, FaShoppingCart, FaLock } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    applyPromo,
    subtotal,
    discount,
    deliveryFee,
    total,
    openCheckout
  } = useCart()
  
  const [promoInput, setPromoInput] = useState('')

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      applyPromo(promoInput.trim())
      setPromoInput('')
    }
  }

  return (
    <>
      <div 
        className={`cart-overlay ${isCartOpen ? 'open' : ''}`} 
        onClick={closeCart}
      />
      
      <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3><FaShoppingCart style={{ marginRight: 10 }} /> Your Cart</h3>
          <button className="close-modal" onClick={closeCart}>
            <FaTimes />
          </button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="cart-empty">
              <FaShoppingCart />
              <p>Your cart is empty</p>
              <p style={{ fontSize: '0.9rem', marginTop: 10 }}>Add some delicious items!</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="price">Birr {item.finalPrice.toFixed(2)}</p>
                  <div className="cart-item-qty">
                    <button 
                      className="qty-btn" 
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <FaMinus size={10} />
                    </button>
                    <span>{item.quantity}</span>
                    <button 
                      className="qty-btn" 
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                </div>
                <button 
                  className="remove-item" 
                  onClick={() => removeFromCart(item.id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>
        
        <div className="cart-footer">
          <div className="promo-code">
            <input
              type="text"
              placeholder="Enter promo code"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
            />
            <button onClick={handleApplyPromo}>Apply</button>
          </div>
          
          <div className="cart-summary">
            <div className="cart-summary-row">
              <span>Subtotal:</span>
              <span>Birr {subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="cart-summary-row" style={{ color: 'var(--success)' }}>
                <span>Discount:</span>
                <span>-Birr {discount.toFixed(2)}</span>
              </div>
            )}
            <div className="cart-summary-row">
              <span>Delivery:</span>
              <span>{deliveryFee === 0 ? 'FREE' : `Birr ${deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="cart-total">
              <span>Total:</span>
              <span>Birr {total.toFixed(2)}</span>
            </div>
          </div>
          
          <button className="checkout-btn" onClick={openCheckout}>
            <FaLock /> Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  )
}

export default Cart
