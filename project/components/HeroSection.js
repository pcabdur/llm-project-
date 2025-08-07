function HeroSection({ onVoiceToggle }) {
  try {
    return (
      <section className="relative py-20 px-4" data-name="hero-section" data-file="components/HeroSection.js">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold text-[var(--forest-green)] mb-6">
                Order with Your
                <span className="text-[var(--saffron)]"> Voice</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Experience the future of food ordering. Just speak and enjoy authentic Indian cuisine 
                delivered to your doorstep in minutes.
              </p>
              
              {/* Voice CTA */}
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center lg:justify-start">
                <button 
                  onClick={onVoiceToggle}
                  className="voice-button group relative"
                >
                  <div className="flex items-center space-x-3">
                    <div className="icon-mic text-2xl"></div>
                    <span className="text-lg font-semibold">Speak to Order</span>
                  </div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-[var(--saffron)] to-[var(--spice-red)] rounded-full opacity-30 group-hover:opacity-50 transition-opacity blur"></div>
                </button>
                
                <div className="text-center">
                  <p className="text-sm text-gray-600">or</p>
                  <button className="btn-secondary mt-2">
                    Browse Menu
                  </button>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="flex gap-8 mt-12 justify-center lg:justify-start">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--saffron)]">10k+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--saffron)]">15min</div>
                  <div className="text-sm text-gray-600">Avg Delivery</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[var(--saffron)]">200+</div>
                  <div className="text-sm text-gray-600">Dishes</div>
                </div>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Delicious Indian food spread"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[var(--golden)] rounded-full flex items-center justify-center shadow-lg">
                <div className="icon-star text-2xl text-white"></div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[var(--spice-red)] rounded-full flex items-center justify-center shadow-lg">
                <div className="icon-heart text-xl text-white"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('HeroSection component error:', error);
    return null;
  }
}