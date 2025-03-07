const Footer = () => {
    return (
      <footer className="bg-[#172337] text-white py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-2">ABOUT</h3>
            <ul className="space-y-2">
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Flipkart Stories</li>
              <li>Press</li>
              <li>Corporate Information</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">GROUP COMPANIES</h3>
            <ul className="space-y-2">
              <li>Myntra</li>
              <li>Cleartrip</li>
              <li>Shopsy</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">HELP</h3>
            <ul className="space-y-2">
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation & Returns</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">CONSUMER POLICY</h3>
            <ul className="space-y-2">
              <li>Cancellation & Returns</li>
              <li>Terms Of Use</li>
              <li>Security</li>
              <li>Privacy</li>
              <li>Sitemap</li>
              <li>Grievance Redressal</li>
              <li>EPR Compliance</li>
            </ul>
          </div>
        </div>
  
        <div className="border-t border-gray-700 mt-8 py-4">
          <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
            <div className="flex space-x-6">
              <span>Become a Seller</span>
              <span>Advertise</span>
              <span>Gift Cards</span>
              <span>Help Center</span>
              <span>© 2007-2025 Flipkart.com</span>
            </div>
            <div className="flex space-x-4">
              <img src="/visa.png" alt="Visa" className="h-6" />
              <img src="/mastercard.png" alt="Mastercard" className="h-6" />
              <img src="/paypal.png" alt="PayPal" className="h-6" />
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  