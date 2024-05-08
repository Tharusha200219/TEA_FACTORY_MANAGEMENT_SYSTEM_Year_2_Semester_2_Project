import express from 'express';
import path from 'path';
import multer from 'multer';
import nodemailer from 'nodemailer';
import { Employee } from '../models/employeeModel.js';
import { generatePassword } from '../utils/passwordUtils.js';
import bcrypt from 'bcrypt';


const router = express.Router();
const __dirname = path.resolve();

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Specify the directory where uploaded files should be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Generate unique file names
  }
});

const upload = multer({ storage: storage });

// Serve static files from the 'uploads' directory
router.use('/uploads', express.static('uploads'));

// Function to generate a unique employee ID
function generateEmployeeId() {
  // Prefix for employee ID
  const prefix = 'EMI';
  
  // Generate a random number (you can replace this with a more sophisticated logic)
  const randomNumber = Math.floor(Math.random() * 1000); // Generates a random number between 0 and 999
  
  // Combine prefix and random number to create the employee ID
  const employeeId = prefix + randomNumber;

  return employeeId;
}

// Route for employee login
router.post('/login', async (request, response) => {
  try {
    const { employeeEmail, password } = request.body;

    const employee = await Employee.findOne({ employeeEmail });

    if (!employee) {
      return response.status(404).json({ message: 'Employee not found' });
    }

    // Ensure that the password is fetched properly from the database
    console.log('Comparing password:', password);
    console.log('Hashed password:', employee.password);

    // Compare provided password with hashed password
    const isPasswordValid = await bcrypt.compare(password, employee.password);

    if (!isPasswordValid) {
      return response.status(401).json({ message: 'Invalid email or password' });
    }

    // If credentials are valid, you can generate a token or simply send a success message
    return response.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    return response.status(500).json({ message: 'Internal server error' });
  }
});
// Function to hash the password
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Route for adding a new employee with image upload
router.post('/', upload.single('image'), async (request, response) => {
  try {
    const { employeeName, employeeEmail, employeeMobile, employeeAddress, employeeRole, createdOn, password } = request.body;

    if (!employeeName || !employeeEmail || !employeeMobile || !employeeAddress || !employeeRole || !createdOn || !password) {
      return response.status(400).json({
        message: 'Send all required fields: employeeName, employeeEmail, employeeMobile, employeeAddress, employeeRole, createdOn, password',
      });
    }
    

    // Generate a unique employee ID
    const employeeId = generateEmployeeId();

    // Hash the password before saving
    const hashedPassword = await hashPassword(password);

    const newEmployee = new Employee({
      employeeId, // Add the generated employee ID
      employeeName,
      employeeEmail,
      employeeMobile,
      employeeAddress,
      employeeRoles: employeeRole,
      createdOn,
      password: hashedPassword,
      image: request.file ? path.join('uploads', request.file.filename) : null,
    });

    await newEmployee.save();

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

// Define your nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '2001imashaperera@gmail.com',
    pass: 'dxqqgfymqnymblwf',
  },
});

// Define your API endpoint to send emails
router.post('/send_email', async (req, res) => {
  const { employeeEmail } = req.body;
  try {
    // Generate a random password
    const password = generatePassword();
    
    const url = `http://localhost:5173/HomePage`;

    const emailContent = `
  <p>Welcome to Ever Green Tea. You have been successfully added to the system.</p>
  <p>Your login credentials:</p>
  <p>Email: ${employeeEmail}</p>
  <p>Password: ${password}</p>
  <p>Please click the link below to log in:</p>
  <p><a href="${url}">${url}</a></p>
`;

    await transporter.sendMail({
      from: {
        name: "Employee-Manage Department",
        address: '2001imashaperera@gmail.com'
      },
      to: employeeEmail,
      subject: "Invitation to Join Us",
      html: emailContent
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




export default router;
