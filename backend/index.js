import  express, { request, response }  from "express";
import { PORT,mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { inventory } from "./models/inventorymodel.js";
import { waste } from "./models/wastemodel.js";
import Production from './models/production_schedule_model_t.js';
import  Teatype  from "./models/teatype_management_model.js";
import  Machine  from "./models/machineModel.js";
import machineRoute from "./routes/machineRoute.js";
import inventoryRoute from "./routes/inventoryRoute.js";
import wasteRoute from "./routes/wasteRoute.js";
import productionScheduleRoute from "./routes/production_schedule_route.js";
import teatypeManagementRoute from "./routes/teatype_management_route.js";
import cors from "cors";


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
app.use('/productions',productionScheduleRoute);
app.use('/teatypes',teatypeManagementRoute);
app.use('/machines',machineRoute);










mongoose.connect(mongoDBURL).then(()=>{
    console.log('app connected to database');
    app.listen(PORT,()=>{
        console.log(`app is listen to port :${PORT}`);
    });

}).catch((error)=>{
    console.log(error);

});

