import { useState, useEffect } from 'react'
import { FaPlus, FaUsers, FaUserCheck, FaMoneyBillWave, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'
import AdminLayout from '../../components/AdminLayout'
import { employeesAPI } from '../../services/api'
import toast from 'react-hot-toast'

const Employees = () => {
  const [employees, setEmployees] = useState([])
  const [stats, setStats] = useState({ total: 0, active: 0, totalSalaries: 0 })
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState(null)
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    role: 'baker', salary: '', startDate: '', status: 'active'
  })

  useEffect(() => {
    loadEmployees()
  }, [])

  const loadEmployees = async () => {
    try {
      const { data } = await employeesAPI.getAll()
      if (data.success) {
        setEmployees(data.data)
        setStats(data.stats)
      }
    } catch (error) {
      toast.error('Error loading employees')
    } finally {
      setLoading(false)
    }
  }

  const openModal = (employee = null) => {
    if (employee) {
      setEditingEmployee(employee)
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone || '',
        role: employee.role,
        salary: employee.salary,
        startDate: employee.startDate?.split('T')[0] || '',
        status: employee.status
      })
    } else {
      setEditingEmployee(null)
      setFormData({
        firstName: '', lastName: '', email: '', phone: '',
        role: 'baker', salary: '', startDate: new Date().toISOString().split('T')[0], status: 'active'
      })
    }
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingEmployee(null)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingEmployee) {
        await employeesAPI.update(editingEmployee.id, formData)
        toast.success('Employee updated!')
      } else {
        await employeesAPI.create(formData)
        toast.success('Employee added!')
      }
      closeModal()
      loadEmployees()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving employee')
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeesAPI.delete(id)
        toast.success('Employee deleted')
        loadEmployees()
      } catch (error) {
        toast.error('Error deleting employee')
      }
    }
  }

  return (
    <AdminLayout title="Employee Management">
      {/* Action Bar */}
      <div className="section-actions">
        <div></div>
        <button className="btn-primary" onClick={() => openModal()}>
          <FaPlus /> Add Employee
        </button>
      </div>

      {/* Stats */}
      <div className="employees-stats">
        <div className="emp-stat">
          <FaUsers />
          <div>
            <h4>{stats.total}</h4>
            <p>Total Employees</p>
          </div>
        </div>
        <div className="emp-stat">
          <FaUserCheck />
          <div>
            <h4>{stats.active}</h4>
            <p>Active Today</p>
          </div>
        </div>
        <div className="emp-stat">
          <FaMoneyBillWave />
          <div>
            <h4>Birr {stats.totalSalaries?.toLocaleString()}</h4>
            <p>Monthly Salaries</p>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="dashboard-card full-width">
        <div className="card-header">
          <h4>Employee List</h4>
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
                  <th>Employee</th>
                  <th>Role</th>
                  <th>Phone</th>
                  <th>Salary</th>
                  <th>Start Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td>
                      <div className="table-user">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${emp.firstName}+${emp.lastName}&background=D2691E&color=fff`} 
                          alt={emp.firstName} 
                        />
                        <div className="table-user-info">
                          <h5>{emp.firstName} {emp.lastName}</h5>
                          <p>{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td style={{ textTransform: 'capitalize' }}>{emp.role}</td>
                    <td>{emp.phone || '-'}</td>
                    <td>Birr {emp.salary?.toLocaleString()}</td>
                    <td>{new Date(emp.startDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`status-badge ${emp.status}`}>{emp.status}</span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="action-btn edit" onClick={() => openModal(emp)}>
                          <FaEdit />
                        </button>
                        <button className="action-btn delete" onClick={() => handleDelete(emp.id)}>
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

      {/* Add/Edit Modal */}
      <div className={`admin-modal-overlay ${modalOpen ? 'open' : ''}`}>
        <div className="admin-modal">
          <div className="admin-modal-header">
            <h3>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h3>
            <button className="close-modal" onClick={closeModal}><FaTimes /></button>
          </div>
          <form className="admin-modal-body" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Role</label>
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="baker">Baker</option>
                  <option value="cashier">Cashier</option>
                  <option value="delivery">Delivery</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Salary (Birr)</label>
                <input type="number" name="salary" value={formData.salary} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Start Date</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on-leave">On Leave</option>
                </select>
              </div>
            </div>
            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: 10 }}>
              {editingEmployee ? 'Update Employee' : 'Add Employee'}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}

export default Employees
