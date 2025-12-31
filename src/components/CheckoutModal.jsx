// import { useState } from 'react'
// import { FaTimes, FaLock, FaCheck, FaMotorcycle, FaStore } from 'react-icons/fa'
// import { useCart } from '../context/CartContext'
// import toast from 'react-hot-toast'

// const CheckoutModal = () => {
//   const { isCheckoutOpen, closeCheckout, cart, subtotal, discount, deliveryFee, total, placeOrder } = useCart()
//   const [loading, setLoading] = useState(false)
//   const [success, setSuccess] = useState(false)
//   const [orderNumber, setOrderNumber] = useState('')
//   const [formData, setFormData] = useState({
//     deliveryType: 'delivery',
//     deliveryAddress: '',
//     deliveryCity: 'Addis Ababa',
//     deliveryArea: '',
//     deliveryInstructions: '',
//     paymentMethod: 'cash'
//   })

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     if (formData.deliveryType === 'delivery' && !formData.deliveryAddress) {
//       toast.error('Please enter delivery address')
//       return
//     }

//     setLoading(true)
//     const result = await placeOrder(formData)
    
//     if (result.success) {
//       setOrderNumber(result.order.orderNumber)
//       setSuccess(true)
//       toast.success('Order placed successfully!')
//     }
//     setLoading(false)
//   }

//   const handleClose = () => {
//     setSuccess(false)
//     setFormData({
//       deliveryType: 'delivery',
//       deliveryAddress: '',
//       deliveryCity: 'Addis Ababa',
//       deliveryArea: '',
//       deliveryInstructions: '',
//       paymentMethod: 'cash'
//     })
//     closeCheckout()
//   }

//   return (
//     <div className={`modal-overlay ${isCheckoutOpen ? 'open' : ''}`}>
//       <div className="modal large">
//         <div className="modal-header">
//           <h2>{success ? 'Order Confirmed!' : 'Checkout'}</h2>
//           <p>{success ? `Order #${orderNumber}` : 'Complete your order'}</p>
//           <button className="close-modal" onClick={handleClose}><FaTimes /></button>
//         </div>

//         {success ? (
//           <div className="modal-body" style={{ textAlign: 'center', padding: '50px 30px' }}>
//             <div style={{
//               width: 80, height: 80, borderRadius: '50%',
//               background: 'linear-gradient(135deg, var(--success), #1e8449)',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               margin: '0 auto 25px', fontSize: '2.5rem', color: 'white'
//             }}>
//               <FaCheck />
//             </div>
//             <h3 style={{ marginBottom: 10 }}>Thank you for your order!</h3>
//             <p style={{ color: 'var(--text-muted)', marginBottom: 30 }}>
//               You will receive a confirmation shortly.
//             </p>
//             <button className="submit-btn" onClick={handleClose}>
//               Continue Shopping
//             </button>
//           </div>
//         ) : (
//           <form className="modal-body" onSubmit={handleSubmit}>
//             {/* Order Summary */}
//             <div style={{
//               background: 'linear-gradient(135deg, var(--header-bg), #1d2c4d)',
//               borderRadius: 16, padding: 20, color: 'white', marginBottom: 25
//             }}>
//               <h4 style={{ marginBottom: 15, paddingBottom: 15, borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
//                 Order Summary
//               </h4>
//               {cart.map(item => (
//                 <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, opacity: 0.9 }}>
//                   <span>{item.name} × {item.quantity}</span>
//                   <span>Birr {(item.finalPrice * item.quantity).toFixed(2)}</span>
//                 </div>
//               ))}
//               {discount > 0 && (
//                 <div style={{ display: 'flex', justifyContent: 'space-between', color: '#27ae60' }}>
//                   <span>Discount</span>
//                   <span>-Birr {discount.toFixed(2)}</span>
//                 </div>
//               )}
//               <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15, paddingTop: 15, borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: '1.2rem', fontWeight: 700 }}>
//                 <span>Total</span>
//                 <span>Birr {total.toFixed(2)}</span>
//               </div>
//             </div>

//             {/* Delivery Options */}
//             <div style={{ background: 'var(--bg-cream)', borderRadius: 16, padding: 20, marginBottom: 20 }}>
//               <h4 style={{ marginBottom: 15 }}>Delivery Options</h4>
//               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
//                 <label style={{ cursor: 'pointer' }}>
//                   <input type="radio" name="deliveryType" value="delivery" checked={formData.deliveryType === 'delivery'} onChange={handleChange} style={{ display: 'none' }} />
//                   <div style={{
//                     display: 'flex', alignItems: 'center', gap: 15, padding: 15,
//                     border: `2px solid ${formData.deliveryType === 'delivery' ? 'var(--primary)' : 'var(--border-light)'}`,
//                     borderRadius: 12, background: formData.deliveryType === 'delivery' ? '#fff5eb' : 'white'
//                   }}>
//                     <FaMotorcycle style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
//                     <div>
//                       <strong style={{ display: 'block' }}>Home Delivery</strong>
//                       <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>30-45 mins • Birr 50</span>
//                     </div>
//                   </div>
//                 </label>
//                 <label style={{ cursor: 'pointer' }}>
//                   <input type="radio" name="deliveryType" value="pickup" checked={formData.deliveryType === 'pickup'} onChange={handleChange} style={{ display: 'none' }} />
//                   <div style={{
//                     display: 'flex', alignItems: 'center', gap: 15, padding: 15,
//                     border: `2px solid ${formData.deliveryType === 'pickup' ? 'var(--primary)' : 'var(--border-light)'}`,
//                     borderRadius: 12, background: formData.deliveryType === 'pickup' ? '#fff5eb' : 'white'
//                   }}>
//                     <FaStore style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
//                     <div>
//                       <strong style={{ display: 'block' }}>Store Pickup</strong>
//                       <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>15-20 mins • Free</span>
//                     </div>
//                   </div>
//                 </label>
//               </div>
//             </div>

//             {/* Delivery Address */}
//             {formData.deliveryType === 'delivery' && (
//               <div style={{ background: 'var(--bg-cream)', borderRadius: 16, padding: 20, marginBottom: 20 }}>
//                 <h4 style={{ marginBottom: 15 }}>Delivery Address</h4>
//                 <div className="form-group">
//                   <input type="text" name="deliveryAddress" placeholder="Full delivery address" value={formData.deliveryAddress} onChange={handleChange} required />
//                 </div>
//                 <div className="form-row">
//                   <div className="form-group">
//                     <input type="text" name="deliveryCity" value={formData.deliveryCity} onChange={handleChange} />
//                   </div>
//                   <div className="form-group">
//                     <select name="deliveryArea" value={formData.deliveryArea} onChange={handleChange}>
//                       <option value="">Select Area</option>
//                       <option value="bole">Bole</option>
//                       <option value="kazanchis">Kazanchis</option>
//                       <option value="piassa">Piassa</option>
//                       <option value="megenagna">Megenagna</option>
//                       <option value="gerji">Gerji</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Payment Method */}
//             <div style={{ background: 'var(--bg-cream)', borderRadius: 16, padding: 20, marginBottom: 20 }}>
//               <h4 style={{ marginBottom: 15 }}>Payment Method</h4>
//               <div className="form-group">
//                 <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
//                   <option value="cash">Cash on Delivery</option>
//                   <option value="telebirr">Telebirr</option>
//                   <option value="cbe">CBE Birr</option>
//                   <option value="card">Credit/Debit Card</option>
//                 </select>
//               </div>
//             </div>

//             <button type="submit" className="submit-btn" disabled={loading}>
//               {loading ? <div className="spinner"></div> : <><FaLock /> Place Order</>}
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   )
// }

// export default CheckoutModal



import { useState } from 'react'
import { FaTimes, FaLock, FaCheck, FaMotorcycle, FaStore, FaCreditCard, FaMobileAlt, FaUniversity, FaMoneyBillWave } from 'react-icons/fa'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'

const CheckoutModal = () => {
  const { isCheckoutOpen, closeCheckout, cart, subtotal, discount, deliveryFee, total, placeOrder } = useCart()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [formData, setFormData] = useState({
    deliveryType: 'delivery',
    deliveryAddress: '',
    deliveryCity: 'Addis Ababa',
    deliveryArea: '',
    deliveryInstructions: '',
    paymentMethod: 'cash',
    // Telebirr
    telebirrPhone: '',
    // CBE
    cbeAccountName: '',
    cbeAccountNumber: '',
    // Card
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  })

  const handleChange = (e) => {
    let { name, value } = e.target
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19)
    }
    
    // Format expiry date
    if (name === 'cardExpiry') {
      value = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5)
    }
    
    // Limit CVV to 3-4 digits
    if (name === 'cardCvv') {
      value = value.replace(/\D/g, '').slice(0, 4)
    }
    
    setFormData({ ...formData, [name]: value })
  }

  const validatePayment = () => {
    switch (formData.paymentMethod) {
      case 'telebirr':
        if (!formData.telebirrPhone || formData.telebirrPhone.length < 10) {
          toast.error('Please enter a valid Telebirr phone number')
          return false
        }
        break
      case 'cbe':
        if (!formData.cbeAccountName || !formData.cbeAccountNumber) {
          toast.error('Please enter CBE account details')
          return false
        }
        break
      case 'card':
        if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length < 16) {
          toast.error('Please enter a valid card number')
          return false
        }
        if (!formData.cardName) {
          toast.error('Please enter cardholder name')
          return false
        }
        if (!formData.cardExpiry || formData.cardExpiry.length < 5) {
          toast.error('Please enter card expiry date')
          return false
        }
        if (!formData.cardCvv || formData.cardCvv.length < 3) {
          toast.error('Please enter CVV')
          return false
        }
        break
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.deliveryType === 'delivery' && !formData.deliveryAddress) {
      toast.error('Please enter delivery address')
      return
    }

    if (!validatePayment()) {
      return
    }

    setLoading(true)
    const result = await placeOrder(formData)
    
    if (result.success) {
      setOrderNumber(result.order.orderNumber)
      setSuccess(true)
      toast.success('Order placed successfully!')
    }
    setLoading(false)
  }

  const handleClose = () => {
    setSuccess(false)
    setFormData({
      deliveryType: 'delivery',
      deliveryAddress: '',
      deliveryCity: 'Addis Ababa',
      deliveryArea: '',
      deliveryInstructions: '',
      paymentMethod: 'cash',
      telebirrPhone: '',
      cbeAccountName: '',
      cbeAccountNumber: '',
      cardNumber: '',
      cardName: '',
      cardExpiry: '',
      cardCvv: ''
    })
    closeCheckout()
  }

  // Payment method icons and labels
  const paymentMethods = [
    { id: 'cash', label: 'Cash on Delivery', icon: <FaMoneyBillWave />, color: '#27ae60' },
    { id: 'telebirr', label: 'Telebirr', icon: <FaMobileAlt />, color: '#0066b3' },
    { id: 'cbe', label: 'CBE Birr', icon: <FaUniversity />, color: '#7b3f00' },
    { id: 'card', label: 'Credit/Debit Card', icon: <FaCreditCard />, color: '#e74c3c' }
  ]

  return (
    <div className={`modal-overlay ${isCheckoutOpen ? 'open' : ''}`}>
      <div className="modal large">
        <div className="modal-header">
          <h2>{success ? 'Order Confirmed!' : 'Checkout'}</h2>
          <p>{success ? `Order #${orderNumber}` : 'Complete your order'}</p>
          <button className="close-modal" onClick={handleClose}><FaTimes /></button>
        </div>

        {success ? (
          <div className="modal-body" style={{ textAlign: 'center', padding: '50px 30px' }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--success), #1e8449)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 25px', fontSize: '2.5rem', color: 'white'
            }}>
              <FaCheck />
            </div>
            <h3 style={{ marginBottom: 10 }}>Thank you for your order!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 30 }}>
              You will receive a confirmation shortly.
            </p>
            <button className="submit-btn" onClick={handleClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <form className="modal-body" onSubmit={handleSubmit} style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            {/* Order Summary */}
            <div style={{
              background: 'linear-gradient(135deg, var(--header-bg), #1d2c4d)',
              borderRadius: 16, padding: 20, color: 'white', marginBottom: 25
            }}>
              <h4 style={{ marginBottom: 15, paddingBottom: 15, borderBottom: '1px solid rgba(255,255,255,0.2)' }}>
                Order Summary
              </h4>
              {cart.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, opacity: 0.9 }}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>Birr {(item.finalPrice * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#27ae60' }}>
                  <span>Discount</span>
                  <span>-Birr {discount.toFixed(2)}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15, paddingTop: 15, borderTop: '1px solid rgba(255,255,255,0.2)', fontSize: '1.2rem', fontWeight: 700 }}>
                <span>Total</span>
                <span>Birr {total.toFixed(2)}</span>
              </div>
            </div>

            {/* Delivery Options */}
            <div style={{ background: 'var(--bg-cream)', borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <h4 style={{ marginBottom: 15 }}>Delivery Options</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 15 }}>
                <label style={{ cursor: 'pointer' }}>
                  <input type="radio" name="deliveryType" value="delivery" checked={formData.deliveryType === 'delivery'} onChange={handleChange} style={{ display: 'none' }} />
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 15, padding: 15,
                    border: `2px solid ${formData.deliveryType === 'delivery' ? 'var(--primary)' : 'var(--border-light)'}`,
                    borderRadius: 12, background: formData.deliveryType === 'delivery' ? '#fff5eb' : 'white'
                  }}>
                    <FaMotorcycle style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
                    <div>
                      <strong style={{ display: 'block' }}>Home Delivery</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>30-45 mins • Birr 50</span>
                    </div>
                  </div>
                </label>
                <label style={{ cursor: 'pointer' }}>
                  <input type="radio" name="deliveryType" value="pickup" checked={formData.deliveryType === 'pickup'} onChange={handleChange} style={{ display: 'none' }} />
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 15, padding: 15,
                    border: `2px solid ${formData.deliveryType === 'pickup' ? 'var(--primary)' : 'var(--border-light)'}`,
                    borderRadius: 12, background: formData.deliveryType === 'pickup' ? '#fff5eb' : 'white'
                  }}>
                    <FaStore style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
                    <div>
                      <strong style={{ display: 'block' }}>Store Pickup</strong>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>15-20 mins • Free</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Delivery Address */}
            {formData.deliveryType === 'delivery' && (
              <div style={{ background: 'var(--bg-cream)', borderRadius: 16, padding: 20, marginBottom: 20 }}>
                <h4 style={{ marginBottom: 15 }}>Delivery Address</h4>
                <div className="form-group">
                  <input type="text" name="deliveryAddress" placeholder="Full delivery address" value={formData.deliveryAddress} onChange={handleChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" name="deliveryCity" value={formData.deliveryCity} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <select name="deliveryArea" value={formData.deliveryArea} onChange={handleChange}>
                      <option value="">Select Area</option>
                      <option value="bole">Bole</option>
                      <option value="kazanchis">Kazanchis</option>
                      <option value="piassa">Piassa</option>
                      <option value="megenagna">Megenagna</option>
                      <option value="gerji">Gerji</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div style={{ background: 'var(--bg-cream)', borderRadius: 16, padding: 20, marginBottom: 20 }}>
              <h4 style={{ marginBottom: 15 }}>Payment Method</h4>
              
              {/* Payment Method Selection */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
                {paymentMethods.map(method => (
                  <label key={method.id} style={{ cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value={method.id} 
                      checked={formData.paymentMethod === method.id} 
                      onChange={handleChange} 
                      style={{ display: 'none' }} 
                    />
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: 12,
                      border: `2px solid ${formData.paymentMethod === method.id ? method.color : 'var(--border-light)'}`,
                      borderRadius: 10, 
                      background: formData.paymentMethod === method.id ? `${method.color}15` : 'white',
                      transition: 'all 0.3s ease'
                    }}>
                      <span style={{ color: method.color, fontSize: '1.2rem' }}>{method.icon}</span>
                      <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{method.label}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Cash Payment Info */}
              {formData.paymentMethod === 'cash' && (
                <div style={{ 
                  background: '#e8f8f0', 
                  padding: 15, 
                  borderRadius: 10, 
                  border: '1px solid #27ae60',
                  color: '#1e8449'
                }}>
                  <p style={{ fontWeight: 600, marginBottom: 5 }}>💵 Cash on Delivery</p>
                  <p style={{ fontSize: '0.9rem' }}>Pay with cash when your order arrives. Please have exact amount ready.</p>
                </div>
              )}

              {/* Telebirr Payment */}
              {formData.paymentMethod === 'telebirr' && (
                <div style={{ background: 'white', padding: 15, borderRadius: 10, border: '1px solid var(--border-light)' }}>
                  <p style={{ fontWeight: 600, marginBottom: 15, color: '#0066b3' }}>
                    <FaMobileAlt style={{ marginRight: 8 }} /> Telebirr Payment
                  </p>
                  <div style={{ background: '#e6f2ff', padding: 12, borderRadius: 8, marginBottom: 15, fontSize: '0.9rem' }}>
                    <p><strong>Send payment to:</strong></p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0066b3' }}>0911 36 25 62</p>
                    <p style={{ marginTop: 5 }}>Name: <strong>Evayo Bakery</strong></p>
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.9rem', marginBottom: 5 }}>Your Telebirr Phone Number</label>
                    <input 
                      type="tel" 
                      name="telebirrPhone" 
                      placeholder="09XX XXX XXXX" 
                      value={formData.telebirrPhone} 
                      onChange={handleChange}
                      style={{ background: 'var(--bg-cream)' }}
                    />
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 5 }}>
                      We'll verify your payment using this number
                    </p>
                  </div>
                </div>
              )}

              {/* CBE Payment */}
              {formData.paymentMethod === 'cbe' && (
                <div style={{ background: 'white', padding: 15, borderRadius: 10, border: '1px solid var(--border-light)' }}>
                  <p style={{ fontWeight: 600, marginBottom: 15, color: '#7b3f00' }}>
                    <FaUniversity style={{ marginRight: 8 }} /> CBE Bank Transfer
                  </p>
                  <div style={{ background: '#fef6e6', padding: 12, borderRadius: 8, marginBottom: 15, fontSize: '0.9rem' }}>
                    <p><strong>Transfer to:</strong></p>
                    <p style={{ marginTop: 5 }}>Bank: <strong>Commercial Bank of Ethiopia</strong></p>
                    <p>Account: <strong style={{ fontSize: '1.1rem', color: '#7b3f00' }}>1000123456789</strong></p>
                    <p>Name: <strong>Evayo Bakery PLC</strong></p>
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.9rem', marginBottom: 5 }}>Your Account Name</label>
                    <input 
                      type="text" 
                      name="cbeAccountName" 
                      placeholder="Enter your name as on bank account" 
                      value={formData.cbeAccountName} 
                      onChange={handleChange}
                      style={{ background: 'var(--bg-cream)' }}
                    />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label style={{ fontSize: '0.9rem', marginBottom: 5 }}>Your Account Number</label>
                    <input 
                      type="text" 
                      name="cbeAccountNumber" 
                      placeholder="Enter your CBE account number" 
                      value={formData.cbeAccountNumber} 
                      onChange={handleChange}
                      style={{ background: 'var(--bg-cream)' }}
                    />
                  </div>
                </div>
              )}

              {/* Card Payment */}
              {formData.paymentMethod === 'card' && (
                <div style={{ background: 'white', padding: 15, borderRadius: 10, border: '1px solid var(--border-light)' }}>
                  <p style={{ fontWeight: 600, marginBottom: 15, color: '#e74c3c' }}>
                    <FaCreditCard style={{ marginRight: 8 }} /> Card Payment
                  </p>
                  <div className="form-group">
                    <label style={{ fontSize: '0.9rem', marginBottom: 5 }}>Card Number</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text" 
                        name="cardNumber" 
                        placeholder="1234 5678 9012 3456" 
                        value={formData.cardNumber} 
                        onChange={handleChange}
                        maxLength={19}
                        style={{ background: 'var(--bg-cream)', paddingRight: 50 }}
                      />
                      <div style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 5 }}>
                        <img src="https://img.icons8.com/color/24/visa.png" alt="Visa" />
                        <img src="https://img.icons8.com/color/24/mastercard.png" alt="Mastercard" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.9rem', marginBottom: 5 }}>Cardholder Name</label>
                    <input 
                      type="text" 
                      name="cardName" 
                      placeholder="Name on card" 
                      value={formData.cardName} 
                      onChange={handleChange}
                      style={{ background: 'var(--bg-cream)', textTransform: 'uppercase' }}
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label style={{ fontSize: '0.9rem', marginBottom: 5 }}>Expiry Date</label>
                      <input 
                        type="text" 
                        name="cardExpiry" 
                        placeholder="MM/YY" 
                        value={formData.cardExpiry} 
                        onChange={handleChange}
                        maxLength={5}
                        style={{ background: 'var(--bg-cream)' }}
                      />
                    </div>
                    <div className="form-group">
                      <label style={{ fontSize: '0.9rem', marginBottom: 5 }}>CVV</label>
                      <input 
                        type="password" 
                        name="cardCvv" 
                        placeholder="•••" 
                        value={formData.cardCvv} 
                        onChange={handleChange}
                        maxLength={4}
                        style={{ background: 'var(--bg-cream)' }}
                      />
                    </div>
                  </div>
                  <div style={{ background: '#f5f5f5', padding: 10, borderRadius: 8, fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FaLock style={{ color: '#27ae60' }} />
                    Your payment information is encrypted and secure
                  </div>
                </div>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? <div className="spinner"></div> : <><FaLock /> Pay Birr {total.toFixed(2)}</>}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default CheckoutModal