// require dependencies
const express = require('express'); // node modules use the singleton pattern
const Recipe = require('../models/recipe')
// initialize the router object
const router = express.Router(); // factory function - function thatt returns an object once invoked
// define route/controller code

// ROUTES

// Index

router.get('/', (req, res) => {
    Recipe.find({}, (error, allRecipes) => {
        res.render('index.ejs', {
            recipes: allRecipes,
        });
    });
});

// New

router.get('/new', (req, res) => {
    res.render('new.ejs');
});

// DELETE

router.delete("/:id", (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect("/recipes");
    });
});

// Update
router.put("/:id", (req, res) => {
    if (req.body.completed === "on") {
        req.body.completed = true
    } else {
        req.body.completed = false
    }

    Recipe.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedRecipe) => {
            res.redirect(`/recipes/${req.params.id}`)
        }
    )
})

// Create

router.post('/', (req, res) => {
    if (req.body.completed === 'on') {
        //if checked, req.body.completed is set to 'on'
        req.body.completed = true;
    } else {
        //if not checked, req.body.completed is undefined
        req.body.completed = false;
    }
    Recipe.create(req.body, (error, createdRecipe) => {
        res.redirect('/recipes');
    });
});

// Edit
router.get("/:id/edit", (req, res) => {
    Recipe.findById(req.params.id, (error, foundRecipe) => {
        res.render("edit.ejs", {
            recipe: foundRecipe,
        })
    })
})

// Show
router.get('/:id', (req, res) => {
    Recipe.findById(req.params.id, (err, foundRecipe) => {
        res.render('show.ejs', {
            recipe: foundRecipe,
        });
    });
});


// export the router object using module.exports
module.exports = router;