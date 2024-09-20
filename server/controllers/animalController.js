const Animal = require('../models/Animal');
const Category = require('../models/Category');

exports.createAnimal = async (req, res) => {
    try {
        const { name, image, category } = req.body;

        const categoryDoc = await Category.findById(category);

        if (!categoryDoc) {
            return res.status(400).json({ msg: 'Invalid category ID' });
        }

        const animal = new Animal({
            name,
            image,
            category: categoryDoc._id
        });

        await animal.save();

        res.json(animal);
    } catch (err) {
        console.error('Error creating animal:', err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};

exports.getAnimals = async (req, res) => {
    try {
        const animals = await Animal.find().populate('category');
        res.json(animals);
    } catch (err) {
        console.error('Error fetching animals:', err);
        res.status(500).json({ msg: 'Server error', error: err.message });
    }
};
