import { Routes, Route } from "react-router-dom";
import Inventoryhome from "./pages/Inventoryhome";
import CreateInventory from "./pages/CreateInventory";
import DeleteInventory from "./pages/DeleteInventory";
import EditInvenory from "./pages/EditInventory";
import ShowInventory from "./pages/ShowInventory";
import Inventorys from "./pages/Inventorys";
import Createproductions from './pages/Createproductions';
import Createteatypes from './pages/Createteatypes';
import Deleteproductions from './pages/Deleteproductions';
import Deleteteatypes from './pages/Deleteteatypes';
import Editproductions from './pages/Editproductions';
import Editteatypes from './pages/Editteatypes';
import Showproductions from './pages/Showproductions';
import Showteatypes from './pages/Showteatypes';
import Teatypehome from "./pages/Teatypehome";
import Productionhome from "./pages/Productionhome";
import Home from "./pages/Home.jsx";

import MachineHome from './pages/MachineHome'
import CreateMachine from './pages/CreateMachine'
import ShowMachine from './pages/ShowMachine'
import EditMachine from './pages/EditMachine'
import DeleteMachine from './pages/DeleteMachine'

const App = () => {
  return (
    <Routes>
      <Route path = '/' element={<Home/>}  />
      <Route path = '/Inventorys' element={<Inventorys/>}  />
      <Route path = '/Inventoryhome' element={<Inventoryhome/>}  />
      <Route path = '/inventory/creates' element={<CreateInventory/>} />
      <Route path = '/inventory/details/:id' element={<ShowInventory/>}  />
      <Route path = '/inventory/edit/:id' element={<EditInvenory/>}  />
      <Route path = '/inventory/delete/:id' element={<DeleteInventory/>}  />
      
      <Route path = '/productions/creates' element={<Createproductions/>} />
      <Route path = '/productions/details/:id' element={<Showproductions/>}  />
      <Route path = '/productions/edit/:id' element={<Editproductions/>}  />
      <Route path = '/productions/delete/:id' element={<Deleteproductions/>}  />
      <Route path = '/Productionhome' element={<Productionhome/>}  />

      <Route path = '/teatypes/creates' element={<Createteatypes/>} />
      <Route path = '/teatypes/details/:id' element={<Showteatypes/>}  />
      <Route path = '/teatypes/edit/:id' element={<Editteatypes/>}  />
      <Route path = '/teatypes/delete/:id' element={<Deleteteatypes/>}  />
      <Route path = '/teatypes' element={<Teatypehome/>}  />

      <Route path = '/MachineHome' element={<MachineHome/>}  />
      <Route path = '/machines/creates' element={<CreateMachine/>} />
      <Route path = '/machines/details/:id' element={<ShowMachine/>}  />
      <Route path = '/machines/edit/:id' element={<EditMachine/>}  />
      <Route path = '/machines/delete/:id' element={<DeleteMachine/>}  />
    </Routes>
  );
};

export default App;
