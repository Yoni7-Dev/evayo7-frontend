import { createContext, useContext, useState, useEffect } from 'react'
import { ordersAPI } from '../services/api'
import { useAuth } from './AuthContext'
import toast from 'react-hot-toast'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const { user, openAuthModal } = useAuth()
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isOrdersOpen, setIsOrdersOpen] = useState(false)
  const [orders, setOrders] = useState([])
  const [promoCode, setPromoCode] = useState(null)
  const [promoDiscount, setPromoDiscount] = useState(0)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('evayoCart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('evayoCart', JSON.stringify(cart))
  }, [cart])

  // Load user orders when user changes
  useEffect(() => {
    if (user) {
      loadOrders()
    } else {
      setOrders([])
    }
  }, [user])

  // Load orders from API
  const loadOrders = async () => {
    try {
      const { data } = await ordersAPI.getAll()
      if (data.success) {
        setOrders(data.data)
      }
    } catch (error) {
      console.error('Error loading orders:', error)
    }
  }

  // Add item to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      const finalPrice = product.discount > 0
        ? product.price * (1 - product.discount / 100)
        : product.price
      
      return [...prevCart, { ...product, quantity: 1, finalPrice }]
    })
    
    toast.success(`${product.name} added to cart!`)
  }

  // Remove item from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  // Update item quantity
  const updateQuantity = (productId, change) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change
          if (newQuantity <= 0) {
            return null
          }
          return { ...item, quantity: newQuantity }
        }
        return item
      }).filter(Boolean)
    })
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
    setPromoCode(null)
    setPromoDiscount(0)
  }

  // Apply promo code
  const applyPromo = (code) => {
    const promoCodes = {
      'EVAYO2025': { discount: 10, description: '10% off' },
      'WELCOME': { discount: 15, description: '15% off for new customers' },
      'FREESHIP': { discount: 0, freeShipping: true, description: 'Free shipping' }
    }
    
    const promo = promoCodes[code.toUpperCase()]
    if (promo) {
      setPromoCode(code.toUpperCase())
      setPromoDiscount(promo.discount)
      toast.success(`Promo code applied: ${promo.description}`)
      return true
    } else {
      toast.error('Invalid promo code')
      return false
    }
  }

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.finalPrice * item.quantity), 0)
  const discount = subtotal * (promoDiscount / 100)
  const deliveryFee = subtotal >= 200 ? 0 : 50
  const total = subtotal - discount + deliveryFee

  // Get cart count
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  // Get active orders count
  const activeOrdersCount = orders.filter(o => 
    !['delivered', 'cancelled'].includes(o.status)
  ).length

  // Open cart
  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  // Checkout
  const openCheckout = () => {
    if (!user) {
      openAuthModal('login')
      toast.error('Please sign in to checkout')
      return
    }
    if (cart.length === 0) {
      toast.error('Your cart is empty')
      return
    }
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }
  const closeCheckout = () => setIsCheckoutOpen(false)

  // Orders modal
  const openOrders = () => {
    if (!user) {
      openAuthModal('login')
      toast.error('Please sign in to view orders')
      return
    }
    setIsOrdersOpen(true)
  }
  const closeOrders = () => setIsOrdersOpen(false)

  // Place order
  const placeOrder = async (orderData) => {
    try {
      const { data } = await ordersAPI.create({
        items: cart,
        subtotal,
        discountAmount: discount,
        deliveryFee,
        total,
        ...orderData
      })
      
      if (data.success) {
        clearCart()
        await loadOrders()
        return { success: true, order: data.data }
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to place order'
      toast.error(message)
      return { success: false, message }
    }
  }

  const value = {
    cart,
    orders,
    isCartOpen,
    isCheckoutOpen,
    isOrdersOpen,
    promoCode,
    promoDiscount,
    subtotal,
    discount,
    deliveryFee,
    total,
    cartCount,
    activeOrdersCount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyPromo,
    openCart,
    closeCart,
    openCheckout,
    closeCheckout,
    openOrders,
    closeOrders,
    placeOrder,
    loadOrders
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
