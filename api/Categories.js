const express = require('express');
const { addCategory, getCategories } = require('../controllers/categoryController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, admin, addCategory);
router.get('/', getCategories);

module.exports = router;
