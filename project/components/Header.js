function Header({ currentPage, setCurrentPage }) {
  try {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const menuItems = [
      { id: 'home', label: 'Home', icon: 'home' },
      { id: 'menu', label: 'Menu', icon: 'utensils' },
      { id: 'cart', label: 'Cart', icon: 'shopping-cart' },
      { id: 'orders', label: 'Orders', icon: 'package' },
    ];

    return (
      <header className="bg-white shadow-lg sticky top-0 z-50" data-name="header" data-file="components/Header.js">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-[var(--saffron)] to-[var(--spice-red)] rounded-lg flex items-center justify-center">
                <div className="icon-utensils text-xl text-white"></div>
              </div>
              <h1 className="text-2xl font-bold text-[var(--forest-green)]">SpiceVoice</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    currentPage === item.id 
                      ? 'bg-[var(--saffron)] text-white' 
                      : 'text-gray-700 hover:bg-orange-50'
                  }`}
                >
                  <div className={`icon-${item.icon} text-lg`}></div>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-700 hover:bg-orange-50 rounded-lg">
                <div className="icon-search text-xl"></div>
              </button>
              <button className="p-2 text-gray-700 hover:bg-orange-50 rounded-lg">
                <div className="icon-user text-xl"></div>
              </button>
              
              {/* Mobile menu button */}
              <button 
                className="md:hidden p-2 text-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="icon-menu text-xl"></div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              {menuItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-colors ${
                    currentPage === item.id 
                      ? 'bg-[var(--saffron)] text-white' 
                      : 'text-gray-700 hover:bg-orange-50'
                  }`}
                >
                  <div className={`icon-${item.icon} text-lg`}></div>
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </header>
    );
  } catch (error) {
    console.error('Header component error:', error);
    return null;
  }
}