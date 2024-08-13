const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Asegúrate de que estás usando bcryptjs
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
    const { username, password, role } = req.body; // Incluye el role si es necesario

    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role }); // Asegúrate de guardar el rol si es necesario
        await newUser.save();

        res.status(201).json({ message: 'Usuario registrado exitosamente' });
    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ message: 'Error en el registro', error });
    }
};

// Iniciar sesión de usuario
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Comparar la contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // Crear un token JWT
        const payload = {
            id: user._id,
            role: user.role  // Incluye el rol en el payload si lo necesitas
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ message: 'Error en el inicio de sesión', error });
    }
};

module.exports = { registerUser, loginUser };
