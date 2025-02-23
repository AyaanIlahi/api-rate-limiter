import express from 'express';
import { redis } from './connections.js'; // Import Redis connection
import rateLimiter from './middleware.js'; //Import Rate Limiter
import axios from 'axios';
import pokemonRoutes from "./routes/pokemonRouteHandle.js";
import UnsplashAPI from './routes/UnsplashRouteHandle.js';  // Import Unsplash API routes
import cookieParser from 'cookie-parser';
import createTokenRoute  from './jwt.js'; 
import dotenv from 'dotenv';
dotenv.config({ path: './process.env' });

const app = express();
const port = process.env.PORT || 3000;

// Example API route
app.use('/api', rateLimiter, (req, res) => {
    res.json({ message: 'You have accessed the API!' });
});

app.use("/pokemon", pokemonRoutes);

//app.use(express.json());
app.use(cookieParser());  // To handle cookies for JWT

// Mount Unsplash API routes
app.use('/imagesearch', UnsplashAPI);

// Route to create a user and generate a JWT
app.use('/createToken', createTokenRoute);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});