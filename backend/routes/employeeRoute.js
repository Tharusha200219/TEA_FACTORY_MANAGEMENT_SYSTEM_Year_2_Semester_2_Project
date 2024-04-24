import express from 'express';
import { Employee } from '../models/employeeModel.js';
//import nodemailer from 'nodemailer';
import { createTransport } from 'nodemailer';

const router = express.Router();

// Create a reusable transporter object using the default SMTP transport
/*let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS, // Your dedicated email account (retrieved from environment variables)
    pass: process.env.EMAIL_PASSWORD, // Password for the dedicated email account (retrieved from environment variables)
  },
});*/

const mailserver = createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS, // email account (retrieved from environment variables)
    pass: process.env.EMAIL_PASSWORD,
  },

});

// Route for adding a new employee
router.post('/', async (request, response) => {
  try {
    // Validate request body
    if (
      !request.body.employeeName ||
      !request.body.employeeEmail ||
      !request.body.employeeMobile ||
      !request.body.employeeAddress ||
      !request.body.employeeRoles ||
      !request.body.createdOn
    ) {
      return response.status(400).send({
        message: 'Send all required fields: employeeName, employeeMobile, employeeAddress, employeeRoles, createdOn',
      });
    }

    // Create a new employee
    const newEmployee = {
      employeeName: request.body.employeeName,
      employeeEmail: request.body.employeeEmail,
      employeeMobile: request.body.employeeMobile,
      employeeAddress: request.body.employeeAddress,
      employeeRoles: request.body.employeeRoles,
      createdOn: request.body.createdOn,
    };

    // Save the new employee
    const employee = await Employee.create(newEmployee);

    // If checkbox is checked, send a welcome email
    if (request.body.sendEmailChecked) {
      const { employeeName, employeeEmail } = request.body;

      mailserver.sendMail(
        {
          from:process.env.EMAIL_ADDRESS,
          to:employeeEmail,
          subject: "new user",
          text: "Imasha Perera",
        },
        (err, infor) => {
          if(err){
            log("can not send the email")

          }else{
            log('email sent')
          }
        }
      )
      
      
      
      // Email options
      /*const mailOptions = {
        from: process.env.EMAIL_ADDRESS, // Sender address (your dedicated email account)
        to: employeeEmail, // Recipient address 
        subject: 'Welcome to the company!',
        text: `Dear ${employeeName},\n\nYou have been added to the system successfully. 
        Your username is ${employeeEmail} and your password is generated randomly. 
        Please contact HR for more details.\n\nRegards,\nThe Admin Team`,
      };

      // Send the email
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.error('EmailError:', error);
            return response.status(500).json({ message: 'Failed to send email' });
        } else {
            console.log('Email sent: ' + info.response);
            return response.status(201).json({ message: 'Employee added successfully and email sent' });
        }
      });*/
    } else {
      // If checkbox is not checked, only respond with success message
      response.status(201).json({ message: 'Employee added successfully' });
    }
  } catch (error) {
    console.error('ServerError:', error);
    return response.status(500).json({ message: 'An error occurred on the server' });
  }
});

// Route for Get All employees from database
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

// Route for Get One employee from database by id
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

// Route for Update a employee details
router.put('/:id', async (request, response) =>{
    try {
        const { id } = request.params;

        // Check if employee exists
        const employee = await Employee.findById(id);

        if (!employee) {
            return response.status(404).json({ message: 'Employee not found' });
        }

        // Update department fields
        employee.employeeName = request.body.employeeName;
        employee.employeeEmail = request.body.employeeEmail;
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