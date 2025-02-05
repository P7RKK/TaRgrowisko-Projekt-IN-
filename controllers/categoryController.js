const Category = require('../models/Category');

// Dodawanie kategorii
const addCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name });
    res.status(201).json({ message: 'Kategoria została dodana', category });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
};

// Pobieranie listy kategorii
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
};

module.exports = { addCategory, getCategories };
