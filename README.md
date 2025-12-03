# Airline Management Backend

A microservices-based backend system for managing airline operations including flight search, bookings, user authentication, and notification services.

## Architecture

This project follows a microservices architecture with the following services:

- **API Gateway** - Single entry point for all client requests with rate limiting and authentication middleware
- **AuthService** - Handles user registration, authentication, and JWT token management
- **FlightsAndSearch** - Manages flights, cities, airports, and airplanes with CRUD operations
- **BookingService** - Processes flight bookings and integrates with message queue for notifications
- **ReminderService** - Sends email notifications and reminders for bookings using scheduled jobs

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **ORM**: Sequelize
- **Authentication**: JWT (JSON Web Tokens)
- **Message Queue**: RabbitMQ (AMQP)
- **Email Service**: Nodemailer

## Services Overview

### API Gateway (Port 3005)
- Routes requests to appropriate microservices
- Implements rate limiting (5 requests per 2 minutes)
- Handles authentication verification for protected routes

### AuthService (Port 3001)
- User registration and login
- JWT token generation and validation
- Role-based access control (Admin/User)
- Password hashing with bcrypt

### FlightsAndSearch
- Flight management (create, read, update, search)
- City and airport management
- Airplane information management
- Flight search functionality

### BookingService (Port 3002)
- Flight booking creation
- Integration with message queue for async processing
- Booking data persistence

### ReminderService
- Email notification system
- Scheduled reminder jobs using node-cron
- Ticket/notification management

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MySQL database
- RabbitMQ server (for message queue functionality)

### Installation

1. Clone the repository
2. Navigate to each service directory and install dependencies:
   ```bash
   cd AuthService && npm install
   cd ../BookingService && npm install
   cd ../FlightsAndSearch && npm install
   cd ../ReminderService && npm install
   cd ../API_Gateway && npm install
   ```

3. Configure environment variables in each service (create `.env` files as needed)

4. Set up the database:
   - Run migrations in each service that uses Sequelize
   - Run seeders if available

5. Start each service:
   ```bash
   # In separate terminals
   cd AuthService && npm start
   cd BookingService && npm start
   cd FlightsAndSearch && npm start
   cd ReminderService && npm start
   cd API_Gateway && node index.js
   ```

## API Endpoints

### Authentication
- `POST /api/v1/signup` - User registration
- `POST /api/v1/signin` - User login
- `GET /api/v1/isAuthenticated` - Verify JWT token
- `GET /api/v1/isAdmin` - Check admin status

### Flights
- `GET /api/v1/flights` - Get all flights (with search filters)
- `GET /api/v1/flights/:id` - Get flight by ID
- `POST /api/v1/flights` - Create new flight
- `PATCH /api/v1/flights/:id` - Update flight

### Cities
- `GET /api/v1/city` - Get all cities
- `GET /api/v1/city/:id` - Get city by ID
- `POST /api/v1/city` - Create city
- `PATCH /api/v1/city/:id` - Update city
- `DELETE /api/v1/city/:id` - Delete city

### Bookings
- `POST /bookingService/api/v1/bookings` - Create booking (requires authentication)

## Project Structure

```
├── API_Gateway/          # API Gateway service
├── AuthService/          # Authentication service
├── BookingService/       # Booking management service
├── FlightsAndSearch/     # Flight and search service
└── ReminderService/      # Notification service
```

Each service follows a similar structure:
- `src/controllers/` - Request handlers
- `src/services/` - Business logic
- `src/repository/` - Data access layer
- `src/models/` - Database models
- `src/routes/` - API routes
- `src/migrations/` - Database migrations
- `src/middlewares/` - Custom middleware

## Notes

- Services communicate via HTTP and message queues
- Authentication is handled through JWT tokens passed in headers (`x-access-token`)
- The API Gateway acts as a reverse proxy and authentication gateway
- Database migrations should be run before starting services

