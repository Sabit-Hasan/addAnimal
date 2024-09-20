const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/createCategory', categoryController.createCategory);
router.get('/', categoryController.getCategories);

module.exports = router;
