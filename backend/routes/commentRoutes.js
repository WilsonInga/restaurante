const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment'); // Esto está bien
const authMiddleware = require('../middleware/authMiddleware');


router.post('/', authMiddleware, async (req, res) => {
    const { text, restaurantId } = req.body;
    try {
        const comment = new Comment({
            text,
            restaurant: restaurantId,
            user: req.user.id,
        });
        await comment.save();
        res.json(comment);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

router.get('/:restaurantId', async (req, res) => {
    try {
        const comments = await Comment.find({ restaurant: req.params.restaurantId });
        res.json(comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;
