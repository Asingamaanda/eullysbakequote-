require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Routes

// Get all quotes
app.get('/api/quotes', async (req, res) => {
  try {
    const quotes = await prisma.quote.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(quotes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quotes' });
  }
});

// Get a single quote by ID
app.get('/api/quotes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const quote = await prisma.quote.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!quote) {
      return res.status(404).json({ error: 'Quote not found' });
    }
    
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

// Create a new quote
app.post('/api/quotes', async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      eventType,
      eventDate,
      guestCount,
      cakeType,
      cakeFlavor,
      cakeSize,
      specialRequests
    } = req.body;

    // Basic validation
    if (!customerName || !email || !eventType || !eventDate || !guestCount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Simple price estimation based on guest count and cake size
    let estimatedPrice = guestCount * 5; // Base price per guest
    if (cakeSize === 'small') estimatedPrice += 50;
    else if (cakeSize === 'medium') estimatedPrice += 100;
    else if (cakeSize === 'large') estimatedPrice += 200;

    const quote = await prisma.quote.create({
      data: {
        customerName,
        email,
        phone,
        eventType,
        eventDate: new Date(eventDate),
        guestCount: parseInt(guestCount),
        cakeType,
        cakeFlavor,
        cakeSize,
        specialRequests,
        estimatedPrice
      }
    });

    res.status(201).json(quote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create quote' });
  }
});

// Update quote status
app.patch('/api/quotes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const quote = await prisma.quote.update({
      where: { id: parseInt(id) },
      data: { status }
    });

    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update quote' });
  }
});

// Delete a quote
app.delete('/api/quotes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.quote.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Quote deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete quote' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
