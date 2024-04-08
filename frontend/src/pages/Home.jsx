import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';


const Home = () => {
    return (
        <div
            className="h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('./public/images/bcc.jpg')" }}
        >
            {/* Navigation Bar */}
            <NavigationBar />

            


            {/* Main Content */}
            <div className="container mx-auto flex justify-center items-center h-full ">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-8">Welcome to Ever Green Tea</h1>
                    <div className="space-y-4">
                        <Link to="/inventorys">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                                Inventory
                            </button>
                        </Link>
                        <Link to="/P_home">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">
                                Production
                            </button>
                        </Link>
                        <Link to="/MachineHome">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                                Machine
                            </button>
                        </Link>
                        <Link to="/SupplierHome">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">
                                Supplier
                            </button>
                        </Link>
                        <Link to="/OrderHome">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                                Order
                            </button>
                        </Link>

                        <Link to="/Vehiclehome">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                            Vehiclehome
                            </button>
                        </Link>
                        <Link to="/MaintenanceHome">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
                            Maintenance
                            </button>
                        </Link>
                        
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <p>&copy; {new Date().getFullYear()} Ever Green Tea Factory. All rights reserved.</p>
                        <p>Contact: 0112787678</p>
                    </div>
                    <div>
                        {/* Add any additional footer content here */}
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
