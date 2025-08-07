// Voice Service Utility for SpiceVoice
const VoiceService = {
  // Check if browser supports speech recognition
  isSupported() {
    return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
  },

  // Initialize speech recognition
  createRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN'; // Indian English
    
    return recognition;
  },

  // Parse voice command to extract food order information
  parseCommand(transcript) {
    const command = transcript.toLowerCase();
    
    // Common food items mapping
    const foodItems = {
      'dosa': { name: 'Masala Dosa', price: 120, restaurant: 'Saravana Bhavan' },
      'biryani': { name: 'Chicken Biryani', price: 280, restaurant: 'Hyderabad House' },
      'pani puri': { name: 'Pani Puri', price: 80, restaurant: 'Chaat Corner' },
      'butter chicken': { name: 'Butter Chicken', price: 320, restaurant: 'Delhi Darbar' },
      'idli': { name: 'Idli Sambar', price: 60, restaurant: 'Saravana Bhavan' },
      'samosa': { name: 'Samosa', price: 40, restaurant: 'Chaat Corner' }
    };

    // Extract quantity
    const quantityMatch = command.match(/(\d+|one|two|three|four|five)/);
    let quantity = 1;
    
    if (quantityMatch) {
      const num = quantityMatch[1];
      if (num === 'one') quantity = 1;
      else if (num === 'two') quantity = 2;
      else if (num === 'three') quantity = 3;
      else if (num === 'four') quantity = 4;
      else if (num === 'five') quantity = 5;
      else quantity = parseInt(num) || 1;
    }

    // Find matching food item
    let matchedItem = null;
    for (const [key, item] of Object.entries(foodItems)) {
      if (command.includes(key)) {
        matchedItem = { ...item, quantity };
        break;
      }
    }

    return {
      originalCommand: transcript,
      parsedItem: matchedItem,
      intent: this.detectIntent(command),
      confidence: matchedItem ? 0.8 : 0.3
    };
  },

  // Detect user intent from command
  detectIntent(command) {
    if (command.includes('order') || command.includes('want') || command.includes('get')) {
      return 'order';
    } else if (command.includes('show') || command.includes('see') || command.includes('display')) {
      return 'browse';
    } else if (command.includes('add') || command.includes('cart')) {
      return 'add_to_cart';
    } else if (command.includes('vegetarian') || command.includes('veg')) {
      return 'filter_veg';
    } else if (command.includes('spicy') || command.includes('mild')) {
      return 'filter_spice';
    }
    return 'general';
  },

  // Generate AI response based on parsed command
  generateResponse(parsedCommand) {
    const { parsedItem, intent, originalCommand } = parsedCommand;

    if (parsedItem) {
      return `Great choice! I found ${parsedItem.name} from ${parsedItem.restaurant} for ₹${parsedItem.price}${parsedItem.quantity > 1 ? ` (${parsedItem.quantity} pieces)` : ''}. Would you like me to add it to your cart?`;
    }

    switch (intent) {
      case 'browse':
        return "I can show you our popular categories: Dosa & Idli, Biryani, Chaat & Snacks, Curries, Beverages, and Desserts. Which one interests you?";
      
      case 'filter_veg':
        return "Here are some great vegetarian options: Masala Dosa, Pani Puri, Idli Sambar, and Veg Biryani. Which one would you like to try?";
      
      case 'general':
      default:
        return "I understand you want to order food. You can say things like 'Order 2 Masala Dosas' or 'Show me biryani options'. What would you like to try?";
    }
  }
};

// Export for use in components
window.VoiceService = VoiceService;