import  express, { request, response }  from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";

import { inventory } from "./models/inventorymodel.js";
import { orders } from "./models/orderModel.js";
import { waste } from "./models/wastemodel.js";
import teaLeavesRoute from './routes/teaLeavesRoute.js';
import TeaLeaves from "./models/teaLeavesModel.js";

////Import production and tea type management model & Route ////
import Production from './models/production_schedule_model_t.js';
import  Teatype  from "./models/teatype_management_model.js";
import productionScheduleRoute from "./routes/production_schedule_route.js";
import teatypeManagementRoute from "./routes/teatype_management_route.js";

import  Machine  from "./models/machineModel.js";
import  Maintenance  from "./models/maintenanceModel.js";
import machineRoute from "./routes/machineRoute.js";
import maintenanceRoute from "./routes/maintenanceRoute.js";

import inventoryRoute from "./routes/inventoryRoute.js";
import wasteRoute from "./routes/wasteRoute.js";
import orderRoute from "./routes/orderRoute.js";

import cors from "cors";
import payments from "./routes/payment.js";

import vehicleRoute from './routes/vehicleRoute.js';
import paymentsEmployee from "./routes/paymentEmployee.js";
import orderPayments from "./routes/orderPayments.js";


////Import Supplier management model & Route ////
import { supplier } from "./models/supplierModel.js";
import supplierRoute from "./routes/supplierRoute.js";
import { SupplyRecord } from "./models/supplyrecordModel.js";
import supplyrecordRoute from "./routes/supplyrecordRoute.js";

import { Department } from "./models/departmentModel.js";
import { Employee }  from "./models/employeeModel.js";
import departmentRoute from "./routes/departmentRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
//import emailRoutes from './routes/emailRoutes.js'; // Import emailRoutes using ES6 syntax
import { generatePassword } from './utils/passwordUtils.js';



const app = express();
//this allow express to use json or json to express 
app.use(express.json());
//adding cors policy
app.use(
    cors(
));





//default / get to show normal message
app.get('/',(request, response)=>{
    console.log(request);
    return response.status(234).send('welcome to mern tutorial');
});



app.use('/inventory',inventoryRoute);
app.use('/waste',wasteRoute)
app.use('/teaLeaves', teaLeavesRoute);


// Mounting production and tea type management routes
app.use('/productions',productionScheduleRoute);
app.use('/teatypes',teatypeManagementRoute);

app.use('/machines',machineRoute);
app.use('/maintenances',maintenanceRoute);

app.use('/orders',orderRoute);
app.use('/payments',payments);
app.use('/paymentsEmployee',paymentsEmployee);
app.use('/orderPayments',orderPayments );

app.use('/vehicles', vehicleRoute);


// Mounting supplier management routes
app.use('/suppliers', supplierRoute);
app.use('/supplyrecords', supplyrecordRoute);


app.use('/departments', departmentRoute);
app.use('/employees', employeeRoute);




// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('C:\\Users\\IMASHA\\Documents\\GitHub\\TEA_FACTORY_MANAGEMENT_SYSTEM_Year_2_Semester_2_Project\\backend\\uploads'));

// Example usage of generatePassword function
app.post('/generate_password', (req, res) => {
    const length = req.body.length || 8; // You can specify the length in the request body or use a default value
    const password = generatePassword(length);
    res.json({ password });
  });

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));
//emial





mongoose.connect(mongoDBURL).then(()=>{
    console.log('app connected to database');
    app.listen(PORT,()=>{
        console.log(`app is listen to port :${PORT}`);
    });

}).catch((error)=>{
    console.log(error);

});

