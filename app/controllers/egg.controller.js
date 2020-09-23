const Egg = require('../models/egg.model.js');

// Create and Save a new Egg
exports.create = (req, res) => {
    // console.log("aufgerufen")
    // Validate request
    if(!req.body.amount) {
        return res.status(400).send({
            message: "Egg amount can not be empty"
        });
    }

    // Create an Egg
    const egg = new Egg({
        amount: req.body.amount
    });

    // Save Egg in the database
    egg.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Egg."
        });
    });
};

// Retrieve and return all Eggs from the database.
exports.findAll = (req, res) => {
    Egg.find()
    .then(eggs => {
        res.send(eggs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving eggs."
        });
    });
};


// Retrieve and return all Eggs from the database of Today.
exports.findAllofToday = (req, res) => {
    Egg.find()
    .then(eggs => {
        let date = new Date();
        let eggsOfToday = [];
        for(let i = 0; i < eggs.length; i++){
            if (eggs[i].createdAt.getFullYear() === date.getFullYear() && eggs[i].createdAt.getMonth() === date.getMonth() && eggs[i].createdAt.getDate() === date.getDate()){
                console.log("ei von heute gefunden!!");
                eggsOfToday.push(eggs[i]);

            }
        }

        res.send(eggsOfToday);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving eggs."
        });
    });
};


//returns the egg amount of today
exports.findAmountofToday = (req, res) => {
    Egg.find()
        .then(eggs => {
            let date = new Date();
            let eggsOfToday = [];
            let amount = 0;
            for(let i = 0; i < eggs.length; i++){
                if (eggs[i].createdAt.getFullYear() === date.getFullYear() && eggs[i].createdAt.getMonth() === date.getMonth() && eggs[i].createdAt.getDate() === date.getDate()){
                    amount += Number(eggs[i].amount);
                }
            }

            res.send(amount + "");
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving eggs."
        });
    });
};

// Find a single egg with a eggId
exports.findOne = (req, res) => {
    Egg.findById(req.params.eggId)
    .then(egg => {
        if(!egg) {
            return res.status(404).send({
                message: "Egg not found with id " + req.params.eggId
            });            
        }
        res.send(egg);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Egg not found with id " + req.params.eggId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving egg with id " + req.params.eggId
        });
    });
};

// Update a egg identified by the eggId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.amount) {
        return res.status(400).send({
            message: "Egg content can not be empty"
        });
    }

    // Find egg and update it with the request body
    Egg.findByIdAndUpdate(req.params.eggId, {
        amount: req.body.amount
    }, {new: true})
    .then(egg => {
        if(!egg) {
            return res.status(404).send({
                message: "Egg not found with id " + req.params.eggId
            });
        }
        res.send(egg);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Egg not found with id " + req.params.eggId
            });                
        }
        return res.status(500).send({
            message: "Error updating egg with id " + req.params.eggId
        });
    });
};

// Delete a egg with the specified eggId in the request
exports.delete = (req, res) => {
    Egg.findByIdAndRemove(req.params.eggId)
    .then(egg => {
        if(!egg) {
            return res.status(404).send({
                message: "Egg not found with id " + req.params.eggId
            });
        }
        res.send({message: "Egg deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Egg not found with id " + req.params.eggId
            });                
        }
        return res.status(500).send({
            message: "Could not delete egg with id " + req.params.eggId
        });
    });
};
