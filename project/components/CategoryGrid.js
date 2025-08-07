function CategoryGrid() {
  try {
    const categories = [
      {
        name: 'Dosa & Idli',
        icon: 'circle',
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        count: '25+ items'
      },
      {
        name: 'Biryani',
        icon: 'bowl',
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d7d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        count: '15+ items'
      },
      {
        name: 'Chaat & Snacks',
        icon: 'cookie',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        count: '30+ items'
      },
      {
        name: 'Curries',
        icon: 'soup',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        count: '40+ items'
      },
      {
        name: 'Beverages',
        icon: 'coffee',
        image: 'https://images.unsplash.com/photo-1571934811356-5cc061b6821f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        count: '20+ items'
      },
      {
        name: 'Desserts',
        icon: 'cake',
        image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        count: '18+ items'
      }
    ];

    return (
      <section className="py-16 px-4" data-name="category-grid" data-file="components/CategoryGrid.js">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--forest-green)] mb-4">
              Explore Our Menu
            </h2>
            <p className="text-lg text-gray-600">
              Discover authentic Indian flavors from every region
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="food-card group cursor-pointer transform hover:scale-105 transition-all duration-200"
              >
                <div className="relative h-32 overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-2 left-2 text-white text-xs font-medium">
                    {category.count}
                  </div>
                </div>
                
                <div className="p-4 text-center">
                  <div className={`w-12 h-12 bg-[var(--saffron)] rounded-full flex items-center justify-center mx-auto mb-3`}>
                    <div className={`icon-${category.icon} text-xl text-white`}></div>
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {category.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('CategoryGrid component error:', error);
    return null;
  }
}