import { FaStar, FaShoppingCart } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  
  const discountedPrice = product.discount > 0
    ? product.price * (1 - product.discount / 100)
    : null

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar 
          key={i} 
          style={{ color: i < fullStars ? '#f4b400' : '#ddd' }} 
        />
      )
    }
    return stars
  }

  return (
    <div className="product-card">
      {product.discount > 0 && (
        <div className="discount-badge">-{product.discount}%</div>
      )}
      
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      
      <div className="product-details">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        
        <div className="product-rating">
          <div className="stars">{renderStars(product.rating)}</div>
          <span style={{ fontWeight: 700, marginLeft: 5 }}>{product.rating}</span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            ({product.reviews})
          </span>
        </div>
        
        <div className="product-price">
          {discountedPrice ? (
            <>
              <span className="original-price">Birr {product.price.toFixed(2)}</span>
              <span className="sale-price">Birr {discountedPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="current-price">Birr {product.price.toFixed(2)}</span>
          )}
        </div>
        
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard
