import express from 'express';
import { Employee }  from "../models/employeeModel.js";

const router = express.Router();

// Route for save a new department
router.post('/', async (request, response) => {
    try{
        if(
            !request.body.employeeName ||
            !request.body.employeeMobile ||
            !request.body.employeeAddress ||
            !request.body.employeeRoles || 
            !request.body.createdOn  
           

        ) {
            return response.status(400).send({
               message: 'Send all reuired fields:employeeName, employeeMobile, employeeAddress, employeeRoles, createdOn ',
            });
        }
        const newEmployee = {
            employeeName: request.body.employeeName,
            employeeMobile: request.body.employeeMobile,
            employeeAddress: request.body.employeeAddress,
            employeeRoles: request.body.employeeRoles,
            createdOn: request.body.createdOn,
        };

        const employee = await Employee.create(newEmployee);

        return response.status(201).send(employee);

    }catch (error) {
        console.log(error.message); 
        response.status(500).send({ message: error.message });
    }
});

// Route for Get All Departments from database
router.get('/', async (request, response) => {
    try{
        const employees = await Employee.find({});

        return response.status(200).json({
           count:  employees.length,
           data: employees
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

        const employee = await Employee.findById(id);

        return response.status(200).json(employee);

    }catch (error) {
        console.log(error.message); 
        response.status(500).send({ message: error.message });
    }
});

// Route for Update a Department
router.put('/:id', async (request, response) =>{
    try {
        const { id } = request.params;

        // Check if department exists
        const employee = await Employee.findById(id);

        if (!employee) {
            return response.status(404).json({ message: 'Employee not found' });
        }

        // Update department fields
        employee.employeeName = request.body.employeeName;
        employee.employeeMobile = request.body.employeeMobile;
        employee.employeeAddress = request.body.employeeAddress;
        employee.employeeRoles = request.body.employeeRoles;
        employee.createdOn = request.body.createdOn;

        // Save the updated department
        await employee.save();

        return response.status(200).json({ message: 'Employee details updated successfully' });
    } catch (error) {
        console.log(error.message); 
        response.status(500).send({ message: error.message });
    }
});


//Route for Delete a Department
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        // Find department by ID and delete
        const result = await Employee.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Employee not found' });
        }

        return response.status(200).json({ message: 'Employee profile deleted successfully' });
    } catch (error) {
        console.log(error.message); 
        response.status(500).send({ message: error.message });
    }
});


export default router;