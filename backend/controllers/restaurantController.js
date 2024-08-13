const Restaurant = require('../models/Restaurant');

exports.createRestaurant = async (req, res) => {
    const { name, address, description } = req.body;
    try {
        const restaurant = new Restaurant({
            name,
            address,
            description,
            owner: req.user.id,
        });
        await restaurant.save();
        res.json(restaurant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

exports.updateRestaurant = async (req, res) => {
    const { name, address, description } = req.body;
    try {
        let restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ msg: 'Restaurante no encontrado' });
        }
        if (restaurant.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        restaurant.name = name || restaurant.name;
        restaurant.address = address || restaurant.address;
        restaurant.description = description || restaurant.description;

        await restaurant.save();
        res.json(restaurant);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};

exports.deleteRestaurant = async (req, res) => {
    try {
        let restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ msg: 'Restaurante no encontrado' });
        }
        if (restaurant.owner.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'No autorizado' });
        }

        await restaurant.remove();
        res.json({ msg: 'Restaurante eliminado' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
};
