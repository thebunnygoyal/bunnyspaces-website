const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: [
        'https://thebunnygoyal.github.io',
        'https://bunnyspaces.club',
        'http://localhost:8000',
        'http://localhost:3000'
    ],
    credentials: true
}));
app.use(express.json());

// In-memory storage for RSVPs (replace with database in production)
const rsvps = [];

// Routes
app.get('/', (req, res) => {
    res.json({
        message: 'Bunny Spaces API - Where APIs come to play, not network! 🐰',
        status: 'running',
        endpoints: {
            health: '/health',
            rsvp: '/api/rsvp'
        }
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        message: 'No networking detected, all systems fun! 🎮'
    });
});

// RSVP endpoint
app.post('/api/rsvp', (req, res) => {
    const { name, email, type, fun } = req.body;
    
    // Basic validation
    if (!name || !email || !type) {
        return res.status(400).json({
            error: 'Missing required fields. Even rebels need to fill forms properly! 😅'
        });
    }
    
    // Check for duplicate RSVPs
    const existingRsvp = rsvps.find(r => r.email === email);
    if (existingRsvp) {
        return res.status(409).json({
            message: 'You already RSVPed! Save your excitement for the event! 🎉'
        });
    }
    
    // Add RSVP
    const newRsvp = {
        id: rsvps.length + 1,
        name,
        email,
        type,
        fun: fun || 'No fun idea provided (suspicious... 🤔)',
        timestamp: new Date().toISOString()
    };
    
    rsvps.push(newRsvp);
    
    res.status(201).json({
        message: `Thanks ${name}! You're officially on the no-networking list! 🚫💼`,
        rsvpId: newRsvp.id,
        eventDetails: {
            date: 'June 22, 2025',
            time: '5:00 PM - 7:00 PM',
            location: 'The Space - Kolkata',
            reminder: 'Leave your business cards at home!'
        }
    });
});

// Get RSVP count (for fun stats)
app.get('/api/rsvp/count', (req, res) => {
    res.json({
        count: rsvps.length,
        message: `${rsvps.length} rebels have joined the anti-networking revolution! 🎯`
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        error: '404 - This endpoint is out networking. Try another one! 🤷‍♂️'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong! Even our servers refuse to network properly! 😅'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🐰 Bunny Spaces API hopping on port ${PORT}`);
    console.log(`🚫 Networking strictly prohibited on this server!`);
    console.log(`🎮 Ready to accept fun-only connections...`);
});