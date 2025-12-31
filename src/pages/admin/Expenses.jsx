// import { useState, useEffect } from 'react'
// import { FaPlus, FaWheatAlt, FaBolt, FaHandHoldingUsd, FaHome, FaEllipsisH, FaEdit, FaTrash, FaTimes, FaFilter } from 'react-icons/fa'
// import { Pie } from 'react-chartjs-2'
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
// import AdminLayout from '../../components/AdminLayout'
// import { expensesAPI } from '../../services/api'
// import toast from 'react-hot-toast'

// ChartJS.register(ArcElement, Tooltip, Legend)

// const Expenses = () => {
//   const [expenses, setExpenses] = useState([])
//   const [totals, setTotals] = useState({})
//   const [grandTotal, setGrandTotal] = useState(0)
//   const [loading, setLoading] = useState(true)
//   const [modalOpen, setModalOpen] = useState(false)
//   const [editingExpense, setEditingExpense] = useState(null)
//   const [dateFilter, setDateFilter] = useState({
//     startDate: new Date(new Date().setDate(1)).toISOString().split('T')[0],
//     endDate: new Date().toISOString().split('T')[0]
//   })
//   const [formData, setFormData] = useState({
//     date: '', description: '', category: 'ingredients',
//     amount: '', paymentMethod: 'cash', notes: ''
//   })

//   useEffect(() => {
//     loadExpenses()
//   }, [])

//   const loadExpenses = async () => {
//     try {
//       const { data } = await expensesAPI.getAll(dateFilter)
//       if (data.success) {
//         setExpenses(data.data)
//         setTotals(data.totals)
//         setGrandTotal(data.grandTotal)
//       }
//     } catch (error) {
//       toast.error('Error loading expenses')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleFilter = () => {
//     setLoading(true)
//     loadExpenses()
//   }

//   const openModal = (expense = null) => {
//     if (expense) {
//       setEditingExpense(expense)
//       setFormData({
//         date: expense.date?.split('T')[0] || '',
//         description: expense.description,
//         category: expense.category,
//         amount: expense.amount,
//         paymentMethod: expense.paymentMethod,
//         notes: expense.notes || ''
//       })
//     } else {
//       setEditingExpense(null)
//       setFormData({
//         date: new Date().toISOString().split('T')[0],
//         description: '', category: 'ingredients',
//         amount: '', paymentMethod: 'cash', notes: ''
//       })
//     }
//     setModalOpen(true)
//   }

//   const closeModal = () => {
//     setModalOpen(false)
//     setEditingExpense(null)
//   }

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       if (editingExpense) {
//         await expensesAPI.update(editingExpense.id, formData)
//         toast.success('Expense updated!')
//       } else {
//         await expensesAPI.create(formData)
//         toast.success('Expense added!')
//       }
//       closeModal()
//       loadExpenses()
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Error saving expense')
//     }
//   }

//   const handleDelete = async (id) => {
//     if (confirm('Are you sure you want to delete this expense?')) {
//       try {
//         await expensesAPI.delete(id)
//         toast.success('Expense deleted')
//         loadExpenses()
//       } catch (error) {
//         toast.error('Error deleting expense')
//       }
//     }
//   }

//   const chartData = {
//     labels: Object.keys(totals).filter(k => totals[k] > 0).map(k => k.charAt(0).toUpperCase() + k.slice(1)),
//     datasets: [{
//       data: Object.values(totals).filter(v => v > 0),
//       backgroundColor: ['#D2691E', '#f39c12', '#27ae60', '#3498db', '#9b59b6', '#e74c3c', '#1abc9c', '#34495e']
//     }]
//   }

//   const categoryIcons = {
//     ingredients: <FaWheatAlt />,
//     utilities: <FaBolt />,
//     salaries: <FaHandHoldingUsd />,
//     rent: <FaHome />,
//     other: <FaEllipsisH />
//   }

//   return (
//     <AdminLayout title="Expense Management">
//       {/* Action Bar */}
//       <div className="section-actions">
//         <div className="date-filter">
//           <input 
//             type="date" 
//             value={dateFilter.startDate} 
//             onChange={(e) => setDateFilter({ ...dateFilter, startDate: e.target.value })}
//           />
//           <span>to</span>
//           <input 
//             type="date" 
//             value={dateFilter.endDate} 
//             onChange={(e) => setDateFilter({ ...dateFilter, endDate: e.target.value })}
//           />
//           <button onClick={handleFilter}><FaFilter /> Filter</button>
//         </div>
//         <button className="btn-primary" onClick={() => openModal()}>
//           <FaPlus /> Add Expense
//         </button>
//       </div>

//       {/* Category Stats */}
//       <div className="expense-stats">
//         {Object.entries(totals).slice(0, 5).map(([category, amount]) => (
//           <div key={category} className="expense-stat-card">
//             <div className={`expense-icon ${category}`}>
//               {categoryIcons[category] || <FaEllipsisH />}
//             </div>
//             <div>
//               <h4>Birr {amount?.toLocaleString()}</h4>
//               <p style={{ textTransform: 'capitalize' }}>{category}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Chart and Table */}
//       <div className="dashboard-grid">
//         <div className="dashboard-card">
//           <div className="card-header">
//             <h4>Expenses by Category</h4>
//           </div>
//           <div className="chart-container">
//             <Pie 
//               data={chartData} 
//               options={{ 
//                 responsive: true, 
//                 maintainAspectRatio: false,
//                 plugins: { legend: { position: 'bottom' } }
//               }} 
//             />
//           </div>
//           <div style={{ textAlign: 'center', marginTop: 20, padding: 15, background: 'var(--bg-cream)', borderRadius: 12 }}>
//             <p style={{ color: 'var(--text-muted)', marginBottom: 5 }}>Total Expenses</p>
//             <h3 style={{ color: 'var(--accent)' }}>Birr {grandTotal?.toLocaleString()}</h3>
//           </div>
//         </div>

//         <div className="dashboard-card">
//           <div className="card-header">
//             <h4>Recent Expenses</h4>
//           </div>
          
//           {loading ? (
//             <div style={{ textAlign: 'center', padding: 50 }}>
//               <div className="spinner"></div>
//             </div>
//           ) : (
//             <div className="table-container" style={{ maxHeight: 400, overflowY: 'auto' }}>
//               <table className="admin-table">
//                 <thead>
//                   <tr>
//                     <th>Date</th>
//                     <th>Description</th>
//                     <th>Category</th>
//                     <th>Amount</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {expenses.slice(0, 10).map(exp => (
//                     <tr key={exp.id}>
//                       <td>{new Date(exp.date).toLocaleDateString()}</td>
//                       <td>{exp.description}</td>
//                       <td style={{ textTransform: 'capitalize' }}>{exp.category}</td>
//                       <td><strong>Birr {exp.amount?.toLocaleString()}</strong></td>
//                       <td>
//                         <div className="action-btns">
//                           <button className="action-btn edit" onClick={() => openModal(exp)}>
//                             <FaEdit />
//                           </button>
//                           <button className="action-btn delete" onClick={() => handleDelete(exp.id)}>
//                             <FaTrash />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Full Expenses Table */}
//       <div className="dashboard-card full-width" style={{ marginTop: 25 }}>
//         <div className="card-header">
//           <h4>All Expense Records</h4>
//         </div>
//         <div className="table-container">
//           <table className="admin-table">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Description</th>
//                 <th>Category</th>
//                 <th>Amount</th>
//                 <th>Payment Method</th>
//                 <th>Added By</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {expenses.map(exp => (
//                 <tr key={exp.id}>
//                   <td>{new Date(exp.date).toLocaleDateString()}</td>
//                   <td>{exp.description}</td>
//                   <td style={{ textTransform: 'capitalize' }}>{exp.category}</td>
//                   <td><strong>Birr {exp.amount?.toLocaleString()}</strong></td>
//                   <td style={{ textTransform: 'capitalize' }}>{exp.paymentMethod}</td>
//                   <td>{exp.addedBy}</td>
//                   <td>
//                     <div className="action-btns">
//                       <button className="action-btn edit" onClick={() => openModal(exp)}>
//                         <FaEdit />
//                       </button>
//                       <button className="action-btn delete" onClick={() => handleDelete(exp.id)}>
//                         <FaTrash />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Add/Edit Modal */}
//       <div className={`admin-modal-overlay ${modalOpen ? 'open' : ''}`}>
//         <div className="admin-modal">
//           <div className="admin-modal-header">
//             <h3>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h3>
//             <button className="close-modal" onClick={closeModal}><FaTimes /></button>
//           </div>
//           <form className="admin-modal-body" onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label>Date</label>
//               <input type="date" name="date" value={formData.date} onChange={handleChange} required />
//             </div>
//             <div className="form-group">
//               <label>Description</label>
//               <input type="text" name="description" value={formData.description} onChange={handleChange} required />
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Category</label>
//                 <select name="category" value={formData.category} onChange={handleChange}>
//                   <option value="ingredients">Ingredients</option>
//                   <option value="utilities">Utilities</option>
//                   <option value="salaries">Salaries</option>
//                   <option value="rent">Rent</option>
//                   <option value="equipment">Equipment</option>
//                   <option value="marketing">Marketing</option>
//                   <option value="transport">Transport</option>
//                   <option value="maintenance">Maintenance</option>
//                   <option value="other">Other</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Amount (Birr)</label>
//                 <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Payment Method</label>
//               <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
//                 <option value="cash">Cash</option>
//                 <option value="bank">Bank Transfer</option>
//                 <option value="mobile">Mobile Money</option>
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Notes (Optional)</label>
//               <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} />
//             </div>
//             <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 10 }}>
//               {editingExpense ? 'Update Expense' : 'Add Expense'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </AdminLayout>
//   )
// }

// export default Expenses



import { useState, useEffect } from 'react'
import { FaPlus, FaShoppingBasket, FaBolt, FaHandHoldingUsd, FaHome, FaEllipsisH, FaEdit, FaTrash, FaTimes, FaFilter } from 'react-icons/fa'
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import AdminLayout from '../../components/AdminLayout'
import { expensesAPI } from '../../services/api'
import toast from 'react-hot-toast'

ChartJS.register(ArcElement, Tooltip, Legend)

const Expenses = () => {
  const [expenses, setExpenses] = useState([])
  const [totals, setTotals] = useState({})
  const [grandTotal, setGrandTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingExpense, setEditingExpense] = useState(null)
  const [dateFilter, setDateFilter] = useState({
    startDate: new Date(new Date().setDate(1)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  })
  const [formData, setFormData] = useState({
    date: '', description: '', category: 'ingredients',
    amount: '', paymentMethod: 'cash', notes: ''
  })

  useEffect(() => {
    loadExpenses()
  }, [])

  const loadExpenses = async () => {
    try {
      const { data } = await expensesAPI.getAll(dateFilter)
      if (data.success) {
        setExpenses(data.data)
        setTotals(data.totals)
        setGrandTotal(data.grandTotal)
      }
    } catch (error) {
      toast.error('Error loading expenses')
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = () => {
    setLoading(true)
    loadExpenses()
  }

  const openModal = (expense = null) => {
    if (expense) {
      setEditingExpense(expense)
      setFormData({
        date: expense.date?.split('T')[0] || '',
        description: expense.description,
        category: expense.category,
        amount: expense.amount,
        paymentMethod: expense.paymentMethod,
        notes: expense.notes || ''
      })
    } else {
      setEditingExpense(null)
      setFormData({
        date: new Date().toISOString().split('T')[0],
        description: '', category: 'ingredients',
        amount: '', paymentMethod: 'cash', notes: ''
      })
    }
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingExpense(null)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingExpense) {
        await expensesAPI.update(editingExpense.id, formData)
        toast.success('Expense updated!')
      } else {
        await expensesAPI.create(formData)
        toast.success('Expense added!')
      }
      closeModal()
      loadExpenses()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving expense')
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this expense?')) {
      try {
        await expensesAPI.delete(id)
        toast.success('Expense deleted')
        loadExpenses()
      } catch (error) {
        toast.error('Error deleting expense')
      }
    }
  }

  const chartData = {
    labels: Object.keys(totals).filter(k => totals[k] > 0).map(k => k.charAt(0).toUpperCase() + k.slice(1)),
    datasets: [{
      data: Object.values(totals).filter(v => v > 0),
      backgroundColor: ['#D2691E', '#f39c12', '#27ae60', '#3498db', '#9b59b6', '#e74c3c', '#1abc9c', '#34495e']
    }]
  }

  const categoryIcons = {
    ingredients: <FaShoppingBasket />,
    utilities: <FaBolt />,
    salaries: <FaHandHoldingUsd />,
    rent: <FaHome />,
    other: <FaEllipsisH />
  }

  return (
    <AdminLayout title="Expense Management">
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
        <button className="btn-primary" onClick={() => openModal()}>
          <FaPlus /> Add Expense
        </button>
      </div>

      {/* Category Stats */}
      <div className="expense-stats">
        {Object.entries(totals).slice(0, 5).map(([category, amount]) => (
          <div key={category} className="expense-stat-card">
            <div className={`expense-icon ${category}`}>
              {categoryIcons[category] || <FaEllipsisH />}
            </div>
            <div>
              <h4>Birr {amount?.toLocaleString()}</h4>
              <p style={{ textTransform: 'capitalize' }}>{category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart and Table */}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h4>Expenses by Category</h4>
          </div>
          <div className="chart-container">
            <Pie 
              data={chartData} 
              options={{ 
                responsive: true, 
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } }
              }} 
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: 20, padding: 15, background: 'var(--bg-cream)', borderRadius: 12 }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: 5 }}>Total Expenses</p>
            <h3 style={{ color: 'var(--accent)' }}>Birr {grandTotal?.toLocaleString()}</h3>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h4>Recent Expenses</h4>
          </div>
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: 50 }}>
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="table-container" style={{ maxHeight: 400, overflowY: 'auto' }}>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.slice(0, 10).map(exp => (
                    <tr key={exp.id}>
                      <td>{new Date(exp.date).toLocaleDateString()}</td>
                      <td>{exp.description}</td>
                      <td style={{ textTransform: 'capitalize' }}>{exp.category}</td>
                      <td><strong>Birr {exp.amount?.toLocaleString()}</strong></td>
                      <td>
                        <div className="action-btns">
                          <button className="action-btn edit" onClick={() => openModal(exp)}>
                            <FaEdit />
                          </button>
                          <button className="action-btn delete" onClick={() => handleDelete(exp.id)}>
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Full Expenses Table */}
      <div className="dashboard-card full-width" style={{ marginTop: 25 }}>
        <div className="card-header">
          <h4>All Expense Records</h4>
        </div>
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Added By</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map(exp => (
                <tr key={exp.id}>
                  <td>{new Date(exp.date).toLocaleDateString()}</td>
                  <td>{exp.description}</td>
                  <td style={{ textTransform: 'capitalize' }}>{exp.category}</td>
                  <td><strong>Birr {exp.amount?.toLocaleString()}</strong></td>
                  <td style={{ textTransform: 'capitalize' }}>{exp.paymentMethod}</td>
                  <td>{exp.addedBy}</td>
                  <td>
                    <div className="action-btns">
                      <button className="action-btn edit" onClick={() => openModal(exp)}>
                        <FaEdit />
                      </button>
                      <button className="action-btn delete" onClick={() => handleDelete(exp.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <div className={`admin-modal-overlay ${modalOpen ? 'open' : ''}`}>
        <div className="admin-modal">
          <div className="admin-modal-header">
            <h3>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h3>
            <button className="close-modal" onClick={closeModal}><FaTimes /></button>
          </div>
          <form className="admin-modal-body" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input type="text" name="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={formData.category} onChange={handleChange}>
                  <option value="ingredients">Ingredients</option>
                  <option value="utilities">Utilities</option>
                  <option value="salaries">Salaries</option>
                  <option value="rent">Rent</option>
                  <option value="equipment">Equipment</option>
                  <option value="marketing">Marketing</option>
                  <option value="transport">Transport</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Amount (Birr)</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Payment Method</label>
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                <option value="cash">Cash</option>
                <option value="bank">Bank Transfer</option>
                <option value="mobile">Mobile Money</option>
              </select>
            </div>
            <div className="form-group">
              <label>Notes (Optional)</label>
              <textarea name="notes" value={formData.notes} onChange={handleChange} rows={2} />
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 10 }}>
              {editingExpense ? 'Update Expense' : 'Add Expense'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Expenses

