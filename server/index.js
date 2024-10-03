import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

// Components
import Connection from './database/db.js';
import Router from './routes/route.js';

dotenv.config();

Connection();
const app = express();

app.use(cors());
app.use(express.json()); // Replaces bodyParser.json()



app.use(express.urlencoded({ extended: true })); // Replaces bodyParser.urlencoded()

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, 'build')));

// Serve index.html for any other route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Routes
app.use('/', Router);

const PORT = 8000;


app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));
