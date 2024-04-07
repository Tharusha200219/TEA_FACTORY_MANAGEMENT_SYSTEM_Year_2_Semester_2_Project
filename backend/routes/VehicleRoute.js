import express from "express";
import { Vehicle } from "../models/VehicleModels.js";

const router = express.Router();

// post a new vehicle
router.post('/', async (request, response) => {
  try {
    if (!request.body.type ||!request.body.regnum ||!request.body.maxkgs ||!request.body.date) {
      return response.status(400).send({
        message: "Send all required fields: type,regnum,maxkgs,date",
      });
    }
    const newVehicle = {
      type: request.body.type,
      regnum: request.body.regnum,
      maxkgs: request.body.maxkgs,
      date: request.body.date,
    };

    const vehicle = await Vehicle.create(newVehicle);

    return response.status(201).send(vehicle);

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get all vehicles from database
router.get('/', async (request, response) => {
  try {
    const vehicles = await Vehicle.find({});

    return response.status(200).json({
      count: vehicles.length,
      data: vehicles

    });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// get the vehicle by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const vehicles = await Vehicle.findById(id);

    return response.status(200).json(vehicles);


  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//update
router.put('/:id', async (request, response) => {
  try {
    if (!request.body.type ||!request.body.regnum ||!request.body.maxkgs ||!request.body.date) {

      return response.status(400).send({
        message: "send all required fields: type,regnum,maxkgs,date",
      });
    }

    const { id } = request.params;

    const result = await Vehicle.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: "Vehicle not found" });
    }
    return response.status(200).send({ message: "Vehicle updated succesfully" });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//delete
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Vehicle.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({ message: "Vehicle not found" });

    }
    return response.status(200).send({ message: "Vehicle deleted" });

  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;