import { useState, useEffect } from 'react'
import { FaTruck, FaClock, FaMobileAlt } from 'react-icons/fa'
import ProductCard from '../components/ProductCard'
import { productsAPI } from '../services/api'

const Home = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [activeCategory, setActiveCategory] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const { data } = await productsAPI.getAll()
      if (data.success) {
        setProducts(data.data)
        setFilteredProducts(data.data)
      }
    } catch (error) {
      console.error('Error loading products:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterByCategory = (category) => {
    setActiveCategory(category)
    if (category === 'all') {
      setFilteredProducts(products)
    } else {
      setFilteredProducts(products.filter(p => p.category === category))
    }
  }

  const categories = [
    { id: 'all', label: '🛒 All' },
    { id: 'breads', label: '🍞 Breads' },
    { id: 'pastries', label: '🥐 Pastries' },
    { id: 'cakes', label: '🎂 Cakes' },
    { id: 'cookies', label: '🍪 Cookies' },
    { id: 'beverages', label: '☕ Beverages' }
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">🥖 Freshly Baked Every Morning</span>
          <h2>Evayo ኢቫዮ ዳቦ ቤት</h2>
          <p>Handcrafted with love using the finest ingredients since 2025</p>
          <div className="hero-features">
            <div className="hero-feature">
              <FaTruck />
              <span>Fast Delivery</span>
            </div>
            <div className="hero-feature">
              <FaClock />
              <span>Order Tracking</span>
            </div>
            <div className="hero-feature">
              <FaMobileAlt />
              <span>Easy Online Order</span>
            </div>
          </div>
        </div>
      </section>

      {/* Order Banner */}
      <div className="order-banner">
        <strong>Free Delivery</strong> on orders over Birr 200! Use code: <strong>EVAYO2025</strong>
      </div>

      {/* Category Tabs */}
      <section className="categories">
        <div className="category-tabs">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => filterByCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="section-header">
          <h3>Our Products</h3>
          <span className="product-count">{filteredProducts.length} products</span>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <div className="spinner" style={{ borderColor: 'var(--primary)', borderTopColor: 'var(--primary-dark)' }}></div>
            <p style={{ marginTop: 15, color: 'var(--text-muted)' }}>Loading products...</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default Home
