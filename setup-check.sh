#!/bin/bash

# Setup Verification Script for Eully's Bake Quote System
# This script helps verify your local setup

echo "🧁 Eully's Bake Quote System - Setup Verification"
echo "=================================================="
echo ""

# Check Node.js
echo "Checking Node.js installation..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✅ Node.js is installed: $NODE_VERSION"
else
    echo "❌ Node.js is NOT installed. Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check npm
echo ""
echo "Checking npm installation..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo "✅ npm is installed: $NPM_VERSION"
else
    echo "❌ npm is NOT installed. Please install npm."
    exit 1
fi

# Check PostgreSQL
echo ""
echo "Checking PostgreSQL installation..."
if command -v psql &> /dev/null; then
    PSQL_VERSION=$(psql --version)
    echo "✅ PostgreSQL is installed: $PSQL_VERSION"
else
    echo "❌ PostgreSQL is NOT installed. Please install PostgreSQL from https://www.postgresql.org/download/"
    echo "   Or if it's installed but not in PATH, ensure you can run 'psql' command."
fi

# Check if .env exists
echo ""
echo "Checking environment configuration..."
if [ -f ".env" ]; then
    echo "✅ .env file exists"
else
    echo "⚠️  .env file does NOT exist. Creating from .env.example..."
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo "✅ Created .env file. Please update it with your PostgreSQL credentials."
    else
        echo "❌ .env.example not found!"
    fi
fi

# Check if node_modules exists
echo ""
echo "Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ Dependencies are installed"
else
    echo "⚠️  Dependencies are NOT installed. Run 'npm install'"
fi

echo ""
echo "=================================================="
echo "Setup Check Complete!"
echo ""
echo "Next Steps:"
echo "1. Ensure PostgreSQL is running"
echo "2. Update .env with your database credentials"
echo "3. Run 'npm install' to install dependencies"
echo "4. Run 'npm run prisma:generate' to generate Prisma Client"
echo "5. Run 'npm run prisma:migrate' to setup database"
echo "6. Run 'npm start' to start the application"
echo "7. Open http://localhost:3000 in your browser"
echo ""
