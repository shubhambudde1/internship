import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-2">About Us</h2>
            <p>We are a leading e-commerce platform providing a wide range of products.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Quick Links</h2>
            <ul>
              <li className="mb-2"><a href="/home" className="hover:underline">Home</a></li>
              <li className="mb-2"><a href="/shop" className="hover:underline">Shop</a></li>
              <li className="mb-2"><a href="/contact" className="hover:underline">Contact</a></li>
              <li className="mb-2"><a href="/about" className="hover:underline">About</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-2">Contact Us</h2>
            <p>Email: support@flipcart.com</p>
            <p>Phone: +123 456 7890</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Follow Us</h2>
          <div className="flex space-x-4">
            <a href="https://facebook.com" className="hover:underline">Facebook</a>
            <a href="https://twitter.com" className="hover:underline">Twitter</a>
            <a href="https://instagram.com" className="hover:underline">Instagram</a>
            <a href="https://linkedin.com" className="hover:underline">LinkedIn</a>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-center py-4 mt-8">
        &copy; 2023 Flipcart | All Rights Reserved
      </div>
    </footer>
  );
}

export default Footer;