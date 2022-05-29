const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
	title: { type: String, required: true },
	detail: { type: String, required: true },
    img: { type: String},
	completed: Boolean,
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;