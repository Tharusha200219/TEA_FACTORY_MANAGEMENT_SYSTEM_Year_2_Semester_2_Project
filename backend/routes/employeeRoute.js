import express from 'express';
import path from 'path';
import multer from 'multer';
import { Employee } from '../models/employeeModel.js'; // Update the import statement for Employee model


const router = express.Router();
const __dirname = path.resolve();


// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Specify the directory where uploaded files should be stored

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
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate unique file names
  }
});





const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
router.use('/uploads', express.static('uploads'));

// Route for adding a new employee with image upload
router.post('/', upload.single('image'), async (request, response) => {
  try {
    // Extract data from request body
    const { employeeName, employeeEmail, employeeMobile, employeeAddress, employeeRole, createdOn } = request.body;

    // Validate request body
    if (!employeeName || !employeeEmail || !employeeMobile || !employeeAddress || !employeeRole || !createdOn) {
      return response.status(400).json({
        message: 'Send all required fields: employeeName, employeeEmail, employeeMobile, employeeAddress, employeeRole, createdOn',
      });
    }

    // Create a new employee with image data
    const newEmployee = new Employee({
      employeeName,
      employeeEmail,
      employeeMobile,
      employeeAddress,
      employeeRoles: employeeRole,
      createdOn,
      image: request.file ? path.join('uploads', request.file.filename) : null, // Save image path
    });

    // Save the new employee
    await newEmployee.save();

    // Respond with success message
    return response.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    console.error('ServerError:', error);
    return response.status(500).json({ message: 'An error occurred on the server' });
  }
});

// Route for getting all employees
router.get('/', async (request, response) => {
  try {
    const employees = await Employee.find({});
    response.status(200).json({ count: employees.length, data: employees });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'An error occurred on the server' });
  }
});



// Route for getting a specific employee by ID
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return response.status(404).json({ message: 'Employee not found' });
    }
    response.status(200).json(employee);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'An error occurred on the server' });
  }
});

// Route for updating an employee
router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const updatedEmployee = {
      employeeName: request.body.employeeName,
      employeeEmail: request.body.employeeEmail,
      employeeMobile: request.body.employeeMobile,
      employeeAddress: request.body.employeeAddress,
      employeeRoles: request.body.employeeRoles,
      createdOn: request.body.createdOn,
    };
    const employee = await Employee.findByIdAndUpdate(id, updatedEmployee, { new: true });
    if (!employee) {
      return response.status(404).json({ message: 'Employee not found' });
    }
    response.status(200).json({ message: 'Employee details updated successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'An error occurred on the server' });
  }
});

// Route for deleting an employee
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    if (!deletedEmployee) {
      return response.status(404).json({ message: 'Employee not found' });
    }
    response.status(200).json({ message: 'Employee profile deleted successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'An error occurred on the server' });
  }
});

export default router;
