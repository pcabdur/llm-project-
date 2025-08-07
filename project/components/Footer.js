function Footer() {
  try {
    return (
      <footer className="bg-[var(--forest-green)] text-white py-16" data-name="footer" data-file="components/Footer.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-[var(--saffron)] to-[var(--spice-red)] rounded-lg flex items-center justify-center">
                  <div className="icon-utensils text-xl text-white"></div>
                </div>
                <h3 className="text-2xl font-bold">SpiceVoice</h3>
              </div>
              <p className="text-green-100 mb-6 max-w-md">
                Revolutionizing food delivery with AI voice technology. Order authentic Indian cuisine with just your voice.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="icon-facebook text-lg"></div>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="icon-twitter text-lg"></div>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                  <div className="icon-instagram text-lg"></div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['Menu', 'About Us', 'Contact', 'FAQs', 'Help'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-green-100 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-4">Contact</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="icon-phone text-lg text-green-200"></div>
                  <span className="text-green-100">+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="icon-mail text-lg text-green-200"></div>
                  <span className="text-green-100">hello@spicevoice.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="icon-map-pin text-lg text-green-200 mt-1"></div>
                  <span className="text-green-100">
                    123 Food Street<br />
                    Mumbai, India 400001
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-green-600 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-green-200 text-sm">
              © 2024 SpiceVoice. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-green-200 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-green-200 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  } catch (error) {
    console.error('Footer component error:', error);
    return null;
  }
}