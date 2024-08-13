const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');  // Asegúrate de que la ruta es correcta
const restaurantRoutes = require('./routes/restaurantRoutes');
const commentRoutes = require('./routes/commentRoutes');
const { connectDB } = require('./config/db');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);  // Asegúrate de que esta ruta esté registrada
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/comments', commentRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
