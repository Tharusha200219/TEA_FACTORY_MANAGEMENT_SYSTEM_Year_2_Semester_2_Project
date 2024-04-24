import express from 'express';
import { Department } from "../models/departmentModel.js";

const router = express.Router();

// Route for save a new department
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.departmentName ||
            !request.body.departmentDetails ||
            !request.body.createdOn ||
            !request.body.departmentStatus 

        ) {
            return response.status(400).send({
               message: 'Send all reuired fields:departmentName, departmentDetails, createdOn, departmentStatus',
            });
        }
        const newDepartment = {
            departmentName: request.body.departmentName,
            departmentDetails: request.body.departmentDetails,
            createdOn: request.body.createdOn,
            departmentStatus: request.body.departmentStatus,
        };

        const department = await Department.create(newDepartment);

        return response.status(201).send(department);

    }catch (error) {
        console.log(error.message); 
        response.status(500).send({ message: error.message });
    }
});

// Route for Get All Departments from database
router.get('/', async (request, response) => {
    try{
        const departments = await Department.find({});

        return response.status(200).json({
           count:  departments.length,
           data: departments
        });

    }catch (error) {
        console.log(error.message); 
        response.status(500).send({ message: error.message });
    }
});

// Route for Get One Departments from database by id
router.get('/:id', async (request, response) => {
    try{
        const { id } = request.params;

        const department = await Department.findById(id);

        return response.status(200).json(department);

    }catch (error) {
        console.log(error.message); 
        response.status(500).send({ message: error.message });
    }
});

// Route for updating a department
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        // Find department by ID
        const department = await Department.findById(id);

        if (!department) {
            return response.status(404).json({ message: 'Department not found' });
        }

       
        department.departmentName = 'Updated Department Name';
        department.departmentDetails = 'Updated Department Details';
        department.createdOn = new Date(); // or provide specific date
        department.departmentStatus = 'Updated Status';

        // Save updated department
        await department.save();

        return response.status(200).json({ message: 'Department details updated successfully', updatedDepartment: department });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: 'Error updating department details' });
    }
});

//Route for Delete a Department
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        // Find department by ID and delete
        const result = await Department.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Department not found' });
        }

        return response.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
        console.log(error.message); 
        response.status(500).send({ message: error.message });
    }
});


export default router;