import { useState } from 'react'
import { FaTimes, FaCheck, FaClock, FaUtensils, FaTruck, FaBox, FaBan } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

const OrdersModal = () => {
  const { isOrdersOpen, closeOrders, orders } = useCart()
  const [filter, setFilter] = useState('all')

  const getStatusIcon = (status) => {
    const icons = {
      pending: <FaClock />,
      confirmed: <FaCheck />,
      preparing: <FaUtensils />,
      'out-for-delivery': <FaTruck />,
      delivered: <FaBox />,
      cancelled: <FaBan />
    }
    return icons[status] || <FaClock />
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      confirmed: '#3498db',
      preparing: '#9b59b6',
      'out-for-delivery': '#1abc9c',
      delivered: '#27ae60',
      cancelled: '#e74c3c'
    }
    return colors[status] || '#95a5a6'
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    if (filter === 'active') return !['delivered', 'cancelled'].includes(order.status)
    if (filter === 'completed') return order.status === 'delivered'
    return true
  })

  return (
    <div className={`modal-overlay ${isOrdersOpen ? 'open' : ''}`}>
      <div className="modal large">
        <div className="modal-header">
          <h2>My Orders</h2>
          <p>{orders.length} total orders</p>
          <button className="close-modal" onClick={closeOrders}><FaTimes /></button>
        </div>

        <div className="modal-body">
          {/* Filter Tabs */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 25 }}>
            {['all', 'active', 'completed'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: 25,
                  background: filter === f ? 'var(--primary)' : 'var(--bg-cream)',
                  color: filter === f ? 'white' : 'var(--text-dark)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition)'
                }}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Orders List */}
          {filteredOrders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 50, color: 'var(--text-muted)' }}>
              <FaBox style={{ fontSize: '3rem', marginBottom: 15, opacity: 0.3 }} />
              <p>No orders found</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              {filteredOrders.map(order => (
                <div
                  key={order.id}
                  style={{
                    background: 'var(--bg-cream)',
                    borderRadius: 16,
                    padding: 20,
                    border: '2px solid var(--border-light)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
                    <div>
                      <h4 style={{ marginBottom: 5 }}>#{order.order_number}</h4>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {new Date(order.created_at).toLocaleString()}
                      </span>
                    </div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '8px 16px',
                      borderRadius: 20,
                      background: `${getStatusColor(order.status)}20`,
                      color: getStatusColor(order.status),
                      fontWeight: 600,
                      fontSize: '0.85rem'
                    }}>
                      {getStatusIcon(order.status)}
                      <span>{order.status.replace('-', ' ').toUpperCase()}</span>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: 15 }}>
                    {order.items?.slice(0, 3).map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: '0.9rem' }}>
                        <span>{item.product_name} × {item.quantity}</span>
                        <span>Birr {parseFloat(item.total_price).toFixed(2)}</span>
                      </div>
                    ))}
                    {order.items?.length > 3 && (
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        +{order.items.length - 3} more items
                      </p>
                    )}
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: 15,
                    paddingTop: 15,
                    borderTop: '1px solid var(--border-light)'
                  }}>
                    <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>
                      Total: Birr {parseFloat(order.total).toFixed(2)}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      {order.delivery_type === 'pickup' ? 'Store Pickup' : 'Home Delivery'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default OrdersModal
