# Eully's Bake Quote System

A local baking quote application built with Node.js, Express, PostgreSQL, and Prisma ORM. This system allows customers to request quotes for baked goods for their events and manage those quotes.

## 🎯 Features

- **Quote Request Form**: Customers can submit detailed quote requests for their events
- **Automatic Price Estimation**: System calculates estimated prices based on guest count and cake specifications
- **Quote Management**: View, approve, reject, and delete quotes
- **Real-time Updates**: Frontend automatically refreshes to show the latest quotes
- **Responsive Design**: Beautiful, mobile-friendly interface

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Environment Management**: dotenv

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **PostgreSQL** (v12 or higher) - [Download](https://www.postgresql.org/download/)
- **npm** (comes with Node.js)

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Asingamaanda/eullysbakequote-.git
cd eullysbakequote-
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup PostgreSQL Database

Create a new PostgreSQL database:

```sql
CREATE DATABASE eullysbake;
```

Or use the command line:

```bash
psql -U postgres
CREATE DATABASE eullysbake;
\q
```

### 4. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and update with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/eullysbake"
PORT=3000
```

### 5. Setup Database Schema

Run Prisma migrations to create the database tables:

```bash
npm run prisma:generate
npm run prisma:migrate
```

When prompted for a migration name, you can use: `init`

### 6. Start the Application

```bash
npm start
```

For development with auto-restart on changes:

```bash
npm run dev
```

### 7. Access the Application

Open your browser and navigate to:

```
http://localhost:3000
```

## 📖 Usage

### Submitting a Quote Request

1. Fill out the quote request form with:
   - Customer name (required)
   - Email (required)
   - Phone number (optional)
   - Event type (required)
   - Event date (required)
   - Number of guests (required)
   - Cake preferences (optional)
   - Special requests (optional)

2. Click "Submit Quote Request"

3. The system will calculate an estimated price and create the quote

### Managing Quotes

- **View Quotes**: All quotes are displayed in the "Recent Quotes" section
- **Approve/Reject**: Click the respective buttons on pending quotes
- **Delete**: Remove quotes that are no longer needed

## 💰 Pricing Structure

The system uses the following pricing logic:

- **Base Price**: $5 per guest
- **Small Cake**: +$50
- **Medium Cake**: +$100
- **Large Cake**: +$200

## 🗄️ Database Schema

The application uses a single `Quote` model with the following fields:

- `id`: Auto-incrementing integer (Primary Key)
- `customerName`: Customer's full name
- `email`: Contact email
- `phone`: Contact phone number (optional)
- `eventType`: Type of event (wedding, birthday, etc.)
- `eventDate`: Date of the event
- `guestCount`: Number of expected guests
- `cakeType`: Type of cake (tiered, sheet, cupcakes, custom)
- `cakeFlavor`: Cake flavor preference
- `cakeSize`: Cake size (small, medium, large)
- `specialRequests`: Additional notes or requirements
- `estimatedPrice`: Calculated price estimate
- `status`: Quote status (pending, approved, rejected)
- `createdAt`: Timestamp of creation
- `updatedAt`: Timestamp of last update

## 📝 API Endpoints

- `GET /api/quotes` - Get all quotes
- `GET /api/quotes/:id` - Get a specific quote
- `POST /api/quotes` - Create a new quote
- `PATCH /api/quotes/:id` - Update quote status
- `DELETE /api/quotes/:id` - Delete a quote

## 🔧 NPM Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-restart
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

## 🐛 Troubleshooting

### Database Connection Issues

If you encounter database connection errors:

1. Verify PostgreSQL is running:
   ```bash
   # On Mac/Linux
   sudo service postgresql status
   
   # On Windows (if installed as service)
   net start postgresql-x64-XX
   ```

2. Check your DATABASE_URL in `.env` is correct

3. Ensure the database exists:
   ```bash
   psql -U postgres -l
   ```

### Port Already in Use

If port 3000 is already in use, change the PORT in your `.env` file:

```env
PORT=3001
```

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

ISC License

## 👤 Author

Eully's Bake Quote System