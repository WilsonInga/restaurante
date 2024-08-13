const express = require('express');
const router = express.Router();
const restaurantController = require('../controllers/restaurantController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas para restaurantes
router.post('/', authMiddleware, restaurantController.createRestaurant);
router.get('/', restaurantController.getRestaurants);
router.put('/:id', authMiddleware, restaurantController.updateRestaurant);
router.delete('/:id', authMiddleware, restaurantController.deleteRestaurant);

module.exports = router;
