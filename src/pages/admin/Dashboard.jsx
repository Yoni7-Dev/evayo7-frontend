import { useState, useEffect } from 'react'
import { FaCoins, FaShoppingBag, FaWallet, FaChartPie, FaUsers } from 'react-icons/fa'
import { Line, Doughnut } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import AdminLayout from '../../components/AdminLayout'
import { dashboardAPI } from '../../services/api'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const Dashboard = () => {
  const [stats, setStats] = useState({
    todaySales: 0,
    todayOrders: 0,
    monthExpenses: 0,
    monthProfit: 0,
    totalEmployees: 0
  })
  const [salesData, setSalesData] = useState([])
  const [recentOrders, setRecentOrders] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [statsRes, salesRes, ordersRes, productsRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getSalesChart('week'),
        dashboardAPI.getRecentOrders(),
        dashboardAPI.getTopProducts()
      ])

      if (statsRes.data.success) setStats(statsRes.data.data)
      if (salesRes.data.success) setSalesData(salesRes.data.data)
      if (ordersRes.data.success) setRecentOrders(ordersRes.data.data)
      if (productsRes.data.success) setTopProducts(productsRes.data.data)
    } catch (error) {
      console.error('Error loading dashboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const salesChartData = {
    labels: salesData.map(s => new Date(s.date).toLocaleDateString('en-US', { weekday: 'short' })),
    datasets: [{
      label: 'Sales (Birr)',
      data: salesData.map(s => s.total),
      borderColor: '#D2691E',
      backgroundColor: 'rgba(210, 105, 30, 0.1)',
      fill: true,
      tension: 0.4
    }]
  }

  const categoryChartData = {
    labels: topProducts.map(p => p.name.substring(0, 15)),
    datasets: [{
      data: topProducts.map(p => p.revenue),
      backgroundColor: ['#D2691E', '#8B4513', '#27ae60', '#3498db', '#9b59b6']
    }]
  }

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div style={{ textAlign: 'center', padding: 100 }}>
          <div className="spinner" style={{ width: 40, height: 40 }}></div>
          <p style={{ marginTop: 20 }}>Loading dashboard...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon sales"><FaCoins /></div>
          <div className="stat-info">
            <h3>Birr {stats.todaySales?.toLocaleString() || 0}</h3>
            <p>Today's Sales</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orders"><FaShoppingBag /></div>
          <div className="stat-info">
            <h3>{stats.todayOrders || 0}</h3>
            <p>Today's Orders</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon expenses"><FaWallet /></div>
          <div className="stat-info">
            <h3>Birr {stats.monthExpenses?.toLocaleString() || 0}</h3>
            <p>Month Expenses</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon profit"><FaChartPie /></div>
          <div className="stat-info">
            <h3>Birr {stats.monthProfit?.toLocaleString() || 0}</h3>
            <p>Month Profit</p>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h4>Sales Overview (Last 7 Days)</h4>
          </div>
          <div className="chart-container">
            <Line 
              data={salesChartData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { display: false } }
              }} 
            />
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h4>Top Products</h4>
          </div>
          <div className="chart-container">
            <Doughnut 
              data={categoryChartData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
              }} 
            />
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h4>Recent Orders</h4>
          </div>
          <div style={{ maxHeight: 300, overflowY: 'auto' }}>
            {recentOrders.map(order => (
              <div 
                key={order.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border-light)'
                }}
              >
                <div>
                  <h5 style={{ marginBottom: 3 }}>#{order.order_number}</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {order.itemsCount} items • {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <span style={{ fontWeight: 700 }}>Birr {parseFloat(order.total).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h4>Best Sellers</h4>
          </div>
          <div>
            {topProducts.map((product, idx) => (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 15,
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border-light)'
                }}
              >
                <span style={{
                  width: 30,
                  height: 30,
                  background: 'var(--bg-cream)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  color: 'var(--primary)'
                }}>
                  {idx + 1}
                </span>
                <div style={{ flex: 1 }}>
                  <h5>{product.name}</h5>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {product.totalSold} sold
                  </p>
                </div>
                <span style={{ fontWeight: 600, color: 'var(--success)' }}>
                  Birr {product.revenue?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Dashboard
