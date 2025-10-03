# Quick Start Guide

This guide will help you get the Eully's Bake Quote System up and running quickly.

## Prerequisites Check

Run the setup verification script:

```bash
./setup-check.sh
```

## Step-by-Step Setup

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Express.js (web framework)
- Prisma (ORM)
- PostgreSQL client
- CORS middleware
- dotenv (environment variables)

### 2. Setup Database

Make sure PostgreSQL is running on your machine.

**Create the database:**

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE eullysbake;

# Exit PostgreSQL
\q
```

**Or use a GUI tool like pgAdmin to create the database.**

### 3. Configure Environment

Edit the `.env` file with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/eullysbake"
PORT=3000
```

Example:
```env
DATABASE_URL="postgresql://postgres:mypassword@localhost:5432/eullysbake"
PORT=3000
```

### 4. Initialize Database Schema

```bash
# Generate Prisma Client
npm run prisma:generate

# Run migrations to create tables
npm run prisma:migrate
```

When prompted for migration name, enter: `init`

### 5. Start the Application

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### 6. Access the Application

Open your browser and go to:

```
http://localhost:3000
```

## Testing the Application

### 1. Submit a Quote Request

- Fill out the form with sample data
- Click "Submit Quote Request"
- You should see a success message with an estimated price

### 2. View Quotes

- Scroll down to see the "Recent Quotes" section
- Your submitted quote should appear there

### 3. Manage Quotes

- Click "Approve" or "Reject" to change the quote status
- Click "Delete" to remove a quote

## Common Issues

### Port Already in Use

If you see "Port 3000 is already in use":

1. Change PORT in `.env` to a different number (e.g., 3001)
2. Restart the application

### Database Connection Failed

If you see database connection errors:

1. Make sure PostgreSQL is running
2. Verify your DATABASE_URL in `.env` is correct
3. Check that the database `eullysbake` exists
4. Verify your PostgreSQL username and password

### Prisma Client Not Generated

If you see "Cannot find module '@prisma/client'":

```bash
npm run prisma:generate
```

## Using Prisma Studio

To view and edit your database with a GUI:

```bash
npm run prisma:studio
```

This opens a web interface at `http://localhost:5555`

## API Testing with curl

### Create a Quote

```bash
curl -X POST http://localhost:3000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "John Doe",
    "email": "john@example.com",
    "phone": "555-1234",
    "eventType": "birthday",
    "eventDate": "2024-12-25",
    "guestCount": 30,
    "cakeType": "tiered",
    "cakeFlavor": "chocolate",
    "cakeSize": "medium"
  }'
```

### Get All Quotes

```bash
curl http://localhost:3000/api/quotes
```

### Get Specific Quote

```bash
curl http://localhost:3000/api/quotes/1
```

### Update Quote Status

```bash
curl -X PATCH http://localhost:3000/api/quotes/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "approved"}'
```

### Delete Quote

```bash
curl -X DELETE http://localhost:3000/api/quotes/1
```

## Next Steps

- Customize the pricing logic in `app.js`
- Modify the form fields in `public/index.html`
- Update the styling in `public/index.html` (embedded CSS)
- Add more event types or cake options
- Implement email notifications (requires additional setup)

## Need Help?

Check the main README.md for more detailed information and troubleshooting tips.
