function FeaturedDishes() {
  try {
    const featuredDishes = [
      {
        name: 'Masala Dosa',
        restaurant: 'Saravana Bhavan',
        price: '₹120',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        tags: ['Veg', 'South Indian', 'Crispy'],
        time: '15-20 min'
      },
      {
        name: 'Chicken Biryani',
        restaurant: 'Hyderabad House',
        price: '₹280',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1563379091339-03246963d7d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        tags: ['Non-Veg', 'Spicy', 'Aromatic'],
        time: '25-30 min'
      },
      {
        name: 'Pani Puri',
        restaurant: 'Chaat Corner',
        price: '₹80',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        tags: ['Veg', 'Street Food', 'Tangy'],
        time: '10-15 min'
      },
      {
        name: 'Butter Chicken',
        restaurant: 'Delhi Darbar',
        price: '₹320',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
        tags: ['Non-Veg', 'Creamy', 'Rich'],
        time: '20-25 min'
      }
    ];

    return (
      <section className="py-16 px-4 bg-white" data-name="featured-dishes" data-file="components/FeaturedDishes.js">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[var(--forest-green)] mb-4">
              Trending Now
            </h2>
            <p className="text-lg text-gray-600">
              Most loved dishes by our customers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDishes.map((dish, index) => (
              <div 
                key={index}
                className="food-card group cursor-pointer transform hover:scale-105 transition-all duration-200"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                    <div className="icon-star text-sm text-[var(--golden)]"></div>
                    <span className="text-sm font-semibold">{dish.rating}</span>
                  </div>
                  <div className="absolute top-3 left-3 bg-[var(--forest-green)] text-white text-xs px-2 py-1 rounded-full">
                    {dish.time}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">
                    {dish.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {dish.restaurant}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {dish.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="text-xs bg-orange-100 text-[var(--saffron)] px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-[var(--forest-green)]">
                      {dish.price}
                    </span>
                    <button className="bg-[var(--saffron)] hover:bg-[var(--deep-saffron)] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="btn-secondary">
              View All Menu
            </button>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('FeaturedDishes component error:', error);
    return null;
  }
}