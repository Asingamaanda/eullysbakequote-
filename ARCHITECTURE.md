# Architecture Overview

## Application Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                         │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  public/index.html (Frontend UI)                       │ │
│  │  - Quote Request Form                                  │ │
│  │  - Quote List Display                                  │ │
│  │  - Status Management                                   │ │
│  └────────────────────────────────────────────────────────┘ │
│                            │                                 │
│                            │ HTTP Requests                   │
│  ┌────────────────────────▼──────────────────────────────┐ │
│  │  public/app.js (Frontend Logic)                       │ │
│  │  - Form Handling                                       │ │
│  │  - API Communication                                   │ │
│  │  - DOM Manipulation                                    │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ REST API Calls
                            │ (GET, POST, PATCH, DELETE)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   SERVER (Node.js + Express)                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  app.js (Backend Server)                               │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  Middleware                                       │ │ │
│  │  │  - CORS                                           │ │ │
│  │  │  - JSON Parser                                    │ │ │
│  │  │  - Static File Server                             │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  API Routes                                       │ │ │
│  │  │  - GET    /api/quotes                             │ │ │
│  │  │  - GET    /api/quotes/:id                         │ │ │
│  │  │  - POST   /api/quotes                             │ │ │
│  │  │  - PATCH  /api/quotes/:id                         │ │ │
│  │  │  - DELETE /api/quotes/:id                         │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  Business Logic                                   │ │ │
│  │  │  - Price Calculation                              │ │ │
│  │  │  - Validation                                     │ │ │
│  │  │  - Error Handling                                 │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
│                            │                                 │
│                            │ Prisma Client                   │
│                            ▼                                 │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  @prisma/client (ORM)                                  │ │
│  │  - Database Queries                                    │ │
│  │  - Type Safety                                         │ │
│  │  - Schema Validation                                   │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ SQL Queries
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE (PostgreSQL)                      │
│  ┌────────────────────────────────────────────────────────┐ │
│  │  eullysbake Database                                   │ │
│  │  ┌──────────────────────────────────────────────────┐ │ │
│  │  │  quotes Table                                     │ │ │
│  │  │  - id (PK)                                        │ │ │
│  │  │  - customerName                                   │ │ │
│  │  │  - email                                          │ │ │
│  │  │  - phone                                          │ │ │
│  │  │  - eventType                                      │ │ │
│  │  │  - eventDate                                      │ │ │
│  │  │  - guestCount                                     │ │ │
│  │  │  - cakeType                                       │ │ │
│  │  │  - cakeFlavor                                     │ │ │
│  │  │  - cakeSize                                       │ │ │
│  │  │  - specialRequests                                │ │ │
│  │  │  - estimatedPrice                                 │ │ │
│  │  │  - status                                         │ │ │
│  │  │  - createdAt                                      │ │ │
│  │  │  - updatedAt                                      │ │ │
│  │  └──────────────────────────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Creating a New Quote

1. **User** fills out the quote form in the browser
2. **Frontend (app.js)** captures form data and sends POST request to `/api/quotes`
3. **Backend (app.js)** receives request and validates data
4. **Backend** calculates estimated price based on business rules
5. **Prisma Client** creates new record in the database
6. **Database** stores the quote and returns the created record
7. **Backend** sends response back to frontend
8. **Frontend** displays success message and refreshes quote list

### Viewing Quotes

1. **Frontend** sends GET request to `/api/quotes` on page load
2. **Backend** queries database via Prisma Client
3. **Database** returns all quotes
4. **Backend** sends JSON response to frontend
5. **Frontend** renders quotes in the UI

### Updating Quote Status

1. **User** clicks Approve/Reject button
2. **Frontend** sends PATCH request to `/api/quotes/:id`
3. **Backend** updates the quote status in database
4. **Database** returns updated record
5. **Frontend** refreshes the quote list

## Technology Stack

### Frontend
- **HTML5**: Structure and semantic markup
- **CSS3**: Styling with gradients and modern layouts
- **Vanilla JavaScript**: DOM manipulation and AJAX requests
- **Fetch API**: HTTP requests to backend

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **Prisma**: Modern ORM for database access
- **dotenv**: Environment variable management
- **CORS**: Cross-origin resource sharing

### Database
- **PostgreSQL**: Relational database
- **Prisma Schema**: Database schema definition

## Key Features

### Price Calculation Logic
```javascript
Base Price = guestCount × $5
+ Cake Size Addition:
  - Small: +$50
  - Medium: +$100
  - Large: +$200
```

### Quote Status Workflow
```
┌─────────┐
│ pending │  (Initial state)
└────┬────┘
     │
     ├───► approved  (Quote accepted)
     │
     └───► rejected  (Quote declined)
```

## File Structure

```
eullysbakequote-/
├── prisma/
│   └── schema.prisma         # Database schema definition
├── public/
│   ├── index.html            # Frontend UI
│   └── app.js                # Frontend JavaScript
├── .env                      # Environment variables (not in git)
├── .env.example              # Environment template
├── .gitignore                # Git ignore rules
├── app.js                    # Backend server
├── package.json              # Dependencies and scripts
├── README.md                 # Main documentation
├── QUICKSTART.md             # Quick start guide
├── ARCHITECTURE.md           # This file
└── setup-check.sh            # Setup verification script
```

## API Endpoints

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/quotes` | Get all quotes | - | Array of quotes |
| GET | `/api/quotes/:id` | Get single quote | - | Quote object |
| POST | `/api/quotes` | Create new quote | Quote data | Created quote |
| PATCH | `/api/quotes/:id` | Update quote status | `{status}` | Updated quote |
| DELETE | `/api/quotes/:id` | Delete quote | - | Success message |

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/dbname` |
| `PORT` | Server port number | `3000` |

## Development Workflow

1. Make changes to code
2. Server auto-restarts (if using `npm run dev`)
3. Refresh browser to see changes
4. Test functionality
5. Commit changes

## Production Considerations

For production deployment, consider:

- Add input sanitization and validation
- Implement authentication and authorization
- Add rate limiting
- Enable HTTPS
- Set up database backups
- Add logging and monitoring
- Implement email notifications
- Add payment processing integration
- Use environment-specific configurations
- Add automated tests
