import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import connectToMongoDB from './config/db';
import bookRoutes from './routes/book-routes';
import userRoutes from './routes/user-routes';

const app = express();
const port = 4000;

// Middlewares
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.json());

// Database
connectToMongoDB(port);

// Server
app.listen(port, () => console.log(`Server running in port ${port}`));

// Routes
app.use('/books', bookRoutes);
app.use('/api/user', userRoutes);
