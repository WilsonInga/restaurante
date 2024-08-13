const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Ruta de registro
router.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    try {
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'El usuario ya existe' });
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ username, password: hashedPassword, role });
        await user.save();

        res.status(201).json({ msg: 'Usuario registrado exitosamente' });
    } catch (err) {
        console.error('Error en el registro:', err.message);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

// Ruta de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log(`Intentando iniciar sesión con: { username: '${username}', password: '${password}' }`);

    try {
        // Buscar el usuario en la base de datos
        const user = await User.findOne({ username });
        if (!user) {
            console.log('Usuario no encontrado.');
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        console.log('Usuario encontrado:', user);

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Contraseña proporcionada:', password);
        console.log('Contraseña almacenada (encriptada):', user.password);
        console.log('Coincide:', isMatch);

        if (!isMatch) {
            console.log('Contraseña incorrecta.');
            return res.status(400).json({ msg: 'Credenciales inválidas' });
        }

        // Crear un token JWT
        const payload = {
            user: {
                id: user._id,
                role: user.role
            }
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Token generado:', token);

        res.json({ token });
    } catch (err) {
        console.error('Error al iniciar sesión:', err.message);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

module.exports = router;
