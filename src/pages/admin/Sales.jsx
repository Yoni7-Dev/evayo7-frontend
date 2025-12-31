import { useState, useEffect } from 'react'
import { FaFilter, FaDownload } from 'react-icons/fa'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import AdminLayout from '../../components/AdminLayout'
import { ordersAPI, dashboardAPI } from '../../services/api'
import toast from 'react-hot-toast'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Sales = () => {
  const [orders, setOrders] = useState([])
  const [salesData, setSalesData] = useState([])
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    avgOrder: 0,
    itemsSold: 0
  })
  const [loading, setLoading] = useState(true)
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    loadSalesData()
  }, [])

  const loadSalesData = async () => {
    try {
      const [ordersRes, chartRes] = await Promise.all([
        ordersAPI.getAll({ startDate: dateFilter.startDate, endDate: dateFilter.endDate }),
        dashboardAPI.getSalesChart('month')
      ])

      if (ordersRes.data.success) {
        const salesOrders = ordersRes.data.data.filter(o => o.status !== 'cancelled')
        setOrders(salesOrders)
        
        // Calculate stats
        const totalSales = salesOrders.reduce((sum, o) => sum + parseFloat(o.total), 0)
        const itemsSold = salesOrders.reduce((sum, o) => 
          sum + (o.items?.reduce((s, i) => s + i.quantity, 0) || 0), 0)
        
        setStats({
          totalSales,
          totalOrders: salesOrders.length,
          avgOrder: salesOrders.length > 0 ? totalSales / salesOrders.length : 0,
          itemsSold
        })
      }

      if (chartRes.data.success) {
        setSalesData(chartRes.data.data)
      }
    } catch (error) {
      toast.error('Error loading sales data')
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = () => {
    setLoading(true)
    loadSalesData()
  }

  const chartData = {
    labels: salesData.map(s => new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [{
      label: 'Daily Sales (Birr)',
      data: salesData.map(s => s.total),
      backgroundColor: '#D2691E',
      borderRadius: 5
    }]
  }

  return (
    <AdminLayout title="Sales Management">
      {/* Action Bar */}
      <div className="section-actions">
        <div className="date-filter">
          <input 
            type="date" 
            value={dateFilter.startDate} 
            onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
          />
          <span>to</span>
          <input 
            type="date" 
            value={dateFilter.endDate} 
            onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
          />
          <button onClick={handleFilter}><FaFilter /> Filter</button>
        </div>
        <button className="btn-secondary" onClick={() => toast.success('Report exported!')}>
          <FaDownload /> Export Report
        </button>
      </div>

      {/* Stats */}
      <div className="sales-stats">
        <div className="sales-stat-card">
          <h4 style={{ color: 'var(--text-muted)', marginBottom: 5, fontSize: '0.9rem' }}>Total Sales</h4>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>
            Birr {stats.totalSales.toLocaleString()}
          </p>
        </div>
        <div className="sales-stat-card">
          <h4 style={{ color: 'var(--text-muted)', marginBottom: 5, fontSize: '0.9rem' }}>Total Orders</h4>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>
            {stats.totalOrders}
          </p>
        </div>
        <div className="sales-stat-card">
          <h4 style={{ color: 'var(--text-muted)', marginBottom: 5, fontSize: '0.9rem' }}>Average Order</h4>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>
            Birr {stats.avgOrder.toFixed(2)}
          </p>
        </div>
        <div className="sales-stat-card">
          <h4 style={{ color: 'var(--text-muted)', marginBottom: 5, fontSize: '0.9rem' }}>Items Sold</h4>
          <p style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-dark)' }}>
            {stats.itemsSold}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="dashboard-card full-width" style={{ marginBottom: 25 }}>
        <div className="card-header">
          <h4>Daily Sales Trend</h4>
        </div>
        <div className="chart-container" style={{ height: 350 }}>
          <Bar 
            data={chartData} 
            options={{ 
              responsive: true, 
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { callback: value => 'Birr ' + value }
                }
              }
            }} 
          />
        </div>
      </div>

      {/* Sales Table */}
      <div className="dashboard-card full-width">
        <div className="card-header">
          <h4>Sales Transactions</h4>
        </div>
        
        {loading ? (
          <div style={{ textAlign: 'center', padding: 50 }}>
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Date</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Payment</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id}>
                    <td><strong>#{order.order_number}</strong></td>
                    <td>{new Date(order.created_at).toLocaleString()}</td>
                    <td>{order.customer_name || 'Customer'}</td>
                    <td>{order.items?.length || 0} items</td>
                    <td style={{ textTransform: 'uppercase' }}>{order.payment_method}</td>
                    <td><strong>Birr {parseFloat(order.total).toFixed(2)}</strong></td>
                    <td><span className={`status-badge ${order.status}`}>{order.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

export default Sales
