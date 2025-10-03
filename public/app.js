// Base API URL
const API_URL = 'http://localhost:3000/api';

// DOM Elements
const quoteForm = document.getElementById('quoteForm');
const messageDiv = document.getElementById('message');
const quotesList = document.getElementById('quotesList');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    setupFormSubmission();
    setMinDate();
});

// Set minimum date to today for event date input
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('eventDate').setAttribute('min', today);
}

// Setup form submission
function setupFormSubmission() {
    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(quoteForm);
        const data = Object.fromEntries(formData.entries());
        
        try {
            const response = await fetch(`${API_URL}/quotes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Failed to submit quote request');
            }
            
            const result = await response.json();
            
            showMessage('Quote request submitted successfully! Estimated price: $' + result.estimatedPrice, 'success');
            quoteForm.reset();
            loadQuotes();
        } catch (error) {
            showMessage('Error submitting quote request. Please try again.', 'error');
            console.error('Error:', error);
        }
    });
}

// Show message to user
function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type} show`;
    
    setTimeout(() => {
        messageDiv.classList.remove('show');
    }, 5000);
}

// Load all quotes
async function loadQuotes() {
    try {
        const response = await fetch(`${API_URL}/quotes`);
        
        if (!response.ok) {
            throw new Error('Failed to load quotes');
        }
        
        const quotes = await response.json();
        displayQuotes(quotes);
    } catch (error) {
        console.error('Error loading quotes:', error);
        quotesList.innerHTML = '<p style="color: #e74c3c;">Error loading quotes. Make sure the server is running.</p>';
    }
}

// Display quotes in the list
function displayQuotes(quotes) {
    if (quotes.length === 0) {
        quotesList.innerHTML = '<p style="color: #666;">No quotes yet. Submit your first quote request!</p>';
        return;
    }
    
    quotesList.innerHTML = quotes.map(quote => `
        <div class="quote-item">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                <h3>${quote.customerName}</h3>
                <span class="status-badge status-${quote.status}">${quote.status}</span>
            </div>
            
            <div class="quote-details">
                <div class="quote-detail">
                    <strong>Email:</strong> ${quote.email}
                </div>
                ${quote.phone ? `<div class="quote-detail">
                    <strong>Phone:</strong> ${quote.phone}
                </div>` : ''}
                <div class="quote-detail">
                    <strong>Event:</strong> ${quote.eventType}
                </div>
                <div class="quote-detail">
                    <strong>Date:</strong> ${formatDate(quote.eventDate)}
                </div>
                <div class="quote-detail">
                    <strong>Guests:</strong> ${quote.guestCount}
                </div>
                ${quote.cakeType ? `<div class="quote-detail">
                    <strong>Cake Type:</strong> ${quote.cakeType}
                </div>` : ''}
                ${quote.cakeFlavor ? `<div class="quote-detail">
                    <strong>Flavor:</strong> ${quote.cakeFlavor}
                </div>` : ''}
                ${quote.cakeSize ? `<div class="quote-detail">
                    <strong>Size:</strong> ${quote.cakeSize}
                </div>` : ''}
                <div class="quote-detail">
                    <strong>Estimated Price:</strong> $${quote.estimatedPrice}
                </div>
            </div>
            
            ${quote.specialRequests ? `
                <div class="quote-detail" style="margin-top: 10px;">
                    <strong>Special Requests:</strong><br>
                    ${quote.specialRequests}
                </div>
            ` : ''}
            
            <div class="quote-actions">
                ${quote.status === 'pending' ? `
                    <button class="btn-small btn-approve" onclick="updateQuoteStatus(${quote.id}, 'approved')">
                        Approve
                    </button>
                    <button class="btn-small btn-reject" onclick="updateQuoteStatus(${quote.id}, 'rejected')">
                        Reject
                    </button>
                ` : ''}
                <button class="btn-small btn-delete" onclick="deleteQuote(${quote.id})">
                    Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Update quote status
async function updateQuoteStatus(id, status) {
    try {
        const response = await fetch(`${API_URL}/quotes/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status })
        });
        
        if (!response.ok) {
            throw new Error('Failed to update quote status');
        }
        
        showMessage(`Quote ${status} successfully!`, 'success');
        loadQuotes();
    } catch (error) {
        showMessage('Error updating quote status. Please try again.', 'error');
        console.error('Error:', error);
    }
}

// Delete quote
async function deleteQuote(id) {
    if (!confirm('Are you sure you want to delete this quote?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/quotes/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            throw new Error('Failed to delete quote');
        }
        
        showMessage('Quote deleted successfully!', 'success');
        loadQuotes();
    } catch (error) {
        showMessage('Error deleting quote. Please try again.', 'error');
        console.error('Error:', error);
    }
}
