import { FaFacebookF, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-col">
          <h4>Evayo ኢቫዮ ዳቦ ቤት</h4>
          <p>Welcome to Evayo! We've been crafting delicious breads, pastries, and cakes since 2025.</p>
          <div className="social-links">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaWhatsapp /></a>
          </div>
        </div>
        
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">🍞 Breads</a></li>
            <li><a href="#">🥐 Pastries</a></li>
            <li><a href="#">🎂 Cakes</a></li>
            <li><a href="#">🍪 Cookies</a></li>
          </ul>
        </div>
        
        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul>
            <li><FaMapMarkerAlt style={{ marginRight: 10 }} /> Addis Ababa, Bole Gerji</li>
            <li><FaPhone style={{ marginRight: 10 }} /> +251 911 36 25 62</li>
            <li><FaEnvelope style={{ marginRight: 10 }} /> hello@evayobakery.com</li>
            <li><FaClock style={{ marginRight: 10 }} /> Mon-Sat: 7AM - 8PM</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 Evayo ኢቫዮ ዳቦ ቤት. All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
