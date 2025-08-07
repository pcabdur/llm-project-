# SpiceVoice - Indian Food Ordering Website

## Overview
SpiceVoice is an innovative Indian food ordering platform that integrates AI voice assistant technology to make food ordering accessible and intuitive for everyone, including children and visually impaired users.

## Key Features
- **Voice-Activated Ordering**: Users can order food using natural language voice commands
- **Authentic Indian Cuisine**: Wide variety of traditional dishes from different regions
- **Intuitive Interface**: Child-friendly design with warm Indian-themed colors
- **Real-time Voice Processing**: AI-powered speech recognition and command parsing
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack
- **Frontend**: React 18 + TailwindCSS
- **Database**: Trickle Database (restaurants, dishes, categories)
- **Voice AI**: Custom voice service with speech recognition
- **Design**: Indian-themed with saffron, green, and warm colors
- **Icons**: Lucide icon library
- **Fonts**: Poppins for modern typography

## Current Implementation
### Components
- **Header**: Navigation with logo and menu items
- **HeroSection**: Main call-to-action with voice ordering button
- **CategoryGrid**: Food categories loaded from database with real item counts
- **FeaturedDishes**: Popular dishes fetched from database with restaurant info
- **VoiceAssistant**: Modal for voice interaction with database integration
- **Footer**: Contact information and links

### Database Schema
- **restaurant**: Restaurant details (name, cuisine type, rating, delivery time)
- **food_category**: Food categories with descriptions and images
- **dish**: Menu items with prices, ratings, spice levels, and tags

### Voice Assistant Features
- Speech recognition simulation
- Database-driven command parsing for food orders
- Natural language processing with real menu items
- Quick command suggestions
- Real-time feedback and responses

## Next Steps
- Implement user authentication system
- Add shopping cart functionality with database persistence
- Create detailed menu browsing pages
- Integrate payment processing
- Add order tracking system
- Implement real speech recognition API
