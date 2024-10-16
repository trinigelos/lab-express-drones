const express = require('express');
const router = express.Router();
const Drone = require("../models/Drone.model"); // Import the drone model schema
// require the Drone model here

router.get('/drones', (req, res, next) => {
  Drone.find()
    .then(drones => {
      res.render('drones/list', { drones }) //pass drones list from views folder
    })
  .catch(err =>next(err)) //handle errors
});

router.get('/drones/create', (req, res, next) => {
  res.render("drones/create-form")
  //going to render the form from views, to get input data from the user
      
    
});

router.post('/drones/create', (req, res, next) => {
  //post to db in the following way:
  //1. get info from req.boy 
  //(posted by user in a form w action: route and method:post)
  const { name, propellers, maxSpeed } = req.body;

  //create the element in the db 
  Drone.create({ name, propellers, maxSpeed })
  .then(() => {
    res.redirect('/drones');
    // Redirect to the list of drones(views folder) 
    // after creating it, for user to see it.
  })
    //catch errors 
  .catch(err => {
    console.log('Error while creating drone:', err);
    res.render('drones/create-form');
  });

});

router.get('/drones/:id/edit', (req, res, next) => {
  //get the drone to edit decontructuring the id in the req.params
  const { id } = req.params;



  //search by id and display form to edit
  Drone.findById(id)
    .then(drone => {
      if (!drone) { // if drone not to be found, display error
        return res.status(404).render("not-found");
      }
      //else display the form to edit;
      res.render('drones/update-form', { drone })
    })//catch errors
  .catch(err => next(err))
});

router.post('/drones/:id/edit', (req, res, next) => {
  //get id so we can find it
  const { id } = req.params;
  //get the info from users input in form
  const { name, propellers, maxSpeed } = req.body;

  //search by id - update the list {}
  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed }, { new: true })
  .then(() => {
    res.redirect('/drones'); //show drones after updating
  })
  .catch(err => {
    console.log('Error while updating drone:', err);
    res.render('drones/update-form', { drone: { _id: id, name, propellers, maxSpeed } });
  });
});

router.post('/drones/:id/delete', (req, res, next) => {
  const { id } = req.params;

  Drone.findByIdAndDelete(id)
    .then(() => {
      res.redirect('/drones');
    })
    .catch(err => next(err));
});

module.exports = router;
