# React Meals

A modern food ordering application built with React and Firebase, featuring a responsive UI with Tailwind CSS.

![React Meals Screenshot](https://via.placeholder.com/800x400?text=React+Meals+Screenshot)

## Features

- **Interactive Menu**: Browse through delicious food items with descriptions and prices
- **Cart Management**: Add items to cart, adjust quantities, and view total amount
- **Checkout Process**: Simple and intuitive order placement with customer information
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Real-time Updates**: Data synchronization with Firebase Realtime Database
- **Order Confirmation**: Receive immediate confirmation after placing an order

## Technology Stack

- **Frontend**:
  - React 19 with Hooks
  - Context API for state management
  - Custom hooks for data fetching
  - Tailwind CSS for styling

- **Backend**:
  - Firebase Realtime Database
  - Firebase SDK v11

## Project Structure

```
src/
├── components/     # Main UI components
├── elements/       # Reusable UI elements
├── context/        # Context and reducer for state management
├── hooks/          # Custom hooks for Firebase operations
├── config/         # Firebase configuration
├── utils/          # Utility functions
└── Data/           # Static data
```

## Setup and Installation

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn package manager
- Firebase account

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/react-meals.git
   cd react-meals
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Set up Realtime Database
   - Copy your Firebase configuration

4. Create a Firebase configuration file:
   - Create `src/config/fireBase.js` with your Firebase credentials

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Usage Guide

1. **Browsing the Menu**:
   - Scroll through available food items
   - View details including name, description, and price

2. **Adding Items to Cart**:
   - Select quantity (1-10)
   - Click the "+ Add" button
   - View cart by clicking the cart icon

3. **Managing Cart**:
   - Increase/decrease item quantities with +/- buttons
   - View running total amount
   - Proceed to checkout

4. **Placing an Order**:
   - Fill in your contact information
   - Submit your order
   - Receive order confirmation

## Development Notes

- Custom hooks (`useGetFetch`, `usePostFetch`) handle Firebase operations
- Cart state is managed with useReducer and Context API
- User interface components are separated from business logic
- Data persistence is implemented with localStorage

## Future Enhancements

- User authentication
- Order history
- Payment processing integration
- Admin dashboard for restaurant owners
- Real-time order tracking

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspiration from Maximilian Schwarzmüller's React course concepts
- Icons from [React Icons](https://react-icons.github.io/react-icons/)
- UI design inspired by modern food delivery applications
