// Load environment variables from a .env file into process.env
require('dotenv').config();

// Import necessary modules and files
const express = require('express');
const cors = require('cors');
const urlRoute = require('./routes/url'); // Import routes for handling URL-related operations
const staticRoute = require('./routes/staticRouter'); // Import routes for serving static content
const URL = require('./models/url'); // Import the URL model
const { connectToMongoDB } = require('./connection'); // Import the function to connect to MongoDB
const MONGO_URL = process.env.MONGO_URL; // Retrieve MongoDB connection URL from environment variables
const path = require('path'); // Utilized for handling file paths

// Create an instance of the Express application
const app = express();
app.use(cors());

// Set the port number for the server
const PORT = process.env.PORT || 8001;

// Connect to MongoDB using the specified URL
connectToMongoDB(MONGO_URL);

// Set the view engine for rendering dynamic content (using EJS templating engine)
app.set("view engine", "ejs");

// Set the directory for the views (using absolute path resolution)
app.set("views", path.resolve('./views'));

// Middleware setup for parsing incoming requests with JSON payloads
app.use(express.json());

// Middleware setup for parsing incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: false }));

// Set up routes for serving static content (e.g., HTML, CSS, images)
app.use("/", staticRoute); // Serve static content from the 'staticRoute' path
app.use("/url", urlRoute); // Handle URL-related operations from the 'urlRoute' path

// Route for handling redirects based on a short URL parameter
app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId; // Extract the 'shortId' parameter from the request URL

    // Find and update the URL document based on the 'shortId'
    const event = await URL.findOneAndUpdate(
        {
            shortId, // Find the document with this 'shortId'
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(), // Add a timestamp to the 'visitHistory' array
                },
            },
        }
    );

    // Redirect to the URL associated with the 'event' found above
    res.redirect(event.redirectUrl);
});

// Start the server and listen for incoming connections on the specified PORT
app.listen(PORT, console.log(`Server Started at : http://localhost:${PORT}`));
