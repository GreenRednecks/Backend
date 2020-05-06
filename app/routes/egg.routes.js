module.exports = (app) => {
    const eggs = require('../controllers/egg.controller.js');

    // Create a new Egg
    app.post('/eggs', eggs.create);

    // Retrieve all Eggs
    app.get('/eggs', eggs.findAll);

    // Retrieve a single Egg with eggId
    app.get('/eggs/:eggId', eggs.findOne);

    // Update a Egg with eggId
    app.put('/eggs/:eggId', eggs.update);

    // Delete a Egg with eggId
    app.delete('/eggs/:eggId', eggs.delete);
}