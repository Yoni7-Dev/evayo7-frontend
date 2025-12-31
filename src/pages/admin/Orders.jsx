import { useState, useEffect } from 'react'
import { FaClock, FaCheck, FaUtensils, FaTruck, FaBox, FaBan } from 'react-icons/fa'
import AdminLayout from '../../components/AdminLayout'
import { ordersAPI } from '../../services/api'
import toast from 'react-hot-toast'

const Orders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadOrders()
  }, [filter])

  const loadOrders = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {}
      const { data } = await ordersAPI.getAll(params)
      if (data.success) {
        setOrders(data.data)
      }
    } catch (error) {
      toast.error('Error loading orders')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (orderId, newStatus) => {
    try {
      await ordersAPI.updateStatus(orderId, { status: newStatus })
      toast.success(`Order status updated to ${newStatus}`)
      loadOrders()
    } catch (error) {
      toast.error('Error updating order status')
    }
  }

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

  const filterOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'out-for-delivery', label: 'Out for Delivery' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ]

  return (
    <AdminLayout title="Order Management">
      {/* Filter Tabs */}
      <div className="section-actions">
        <div className="filter-btns">
          {filterOptions.map(opt => (
            <button
              key={opt.value}
              className={`filter-btn ${filter === opt.value ? 'active' : ''}`}
              onClick={() => setFilter(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: 100 }}>
          <div className="spinner"></div>
        </div>
      ) : orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: 100, color: 'var(--text-muted)' }}>
          <FaBox style={{ fontSize: '4rem', marginBottom: 20, opacity: 0.3 }} />
          <p>No orders found</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map(order => (
            <div key={order.id} className="admin-order-card">
              <div className="admin-order-header">
                <div>
                  <h4>#{order.order_number}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {order.customer_name || 'Customer'}
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '6px 12px',
                  borderRadius: 20,
                  background: `${getStatusColor(order.status)}20`,
                  color: getStatusColor(order.status),
                  fontWeight: 600,
                  fontSize: '0.8rem'
                }}>
                  {getStatusIcon(order.status)}
                  {order.status.replace('-', ' ').toUpperCase()}
                </div>
              </div>

              <div className="admin-order-items">
                {order.items?.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="admin-order-item">
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

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 15 }}>
                <p>{order.delivery_type === 'pickup' ? '🏪 Store Pickup' : '🚚 Home Delivery'}</p>
                <p>{new Date(order.created_at).toLocaleString()}</p>
              </div>

              <div className="admin-order-footer">
                <span className="admin-order-total">Birr {parseFloat(order.total).toFixed(2)}</span>
                <div className="admin-order-actions">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    style={{
                      padding: '8px 12px',
                      border: '1px solid var(--border-light)',
                      borderRadius: 8,
                      fontSize: '0.85rem',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="out-for-delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  )
}

export default Orders
