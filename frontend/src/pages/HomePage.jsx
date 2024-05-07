import React from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';

const HomePage = () => {
    return (
        <div className="h-screen bg-cover bg-center" style={{ backgroundImage: "url('./public/images/bcc.jpg')" }}>
            {/* Navigation Bar */}
            <NavigationBar />
            
            {/* Main Content */}
            <div className="container mx-auto flex justify-center items-center h-full ">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-8">Welcome to Ever Green Tea</h1>
                    <div className="space-y-4">
                        <Link to="/I_home">
                            <button
                                className="bg-white text-black font-bold py-2 px-4 rounded mr-4 hover:bg-gray-200"
                                style={{
                                    animation: 'fadeIn 0.5s ease forwards',
                                    transition: 'transform 0.3s ease'
                                }}
                            >
                                Inventory
                            </button>
                        </Link>
                        <Link to="/P_home">
                            <button
                                className="bg-white text-black font-bold py-2 px-4 rounded mr-4 hover:bg-gray-200"
                                style={{
                                    animation: 'fadeIn 0.5s ease forwards',
                                    transition: 'transform 0.3s ease'
                                }}
                            >
                                Production
                            </button>
                        </Link>
                        <Link to="/M_home">
                            <button
                                className="bg-white text-black font-bold py-2 px-4 rounded mr-4 hover:bg-gray-200"
                                style={{
                                    animation: 'fadeIn 0.5s ease forwards',
                                    transition: 'transform 0.3s ease'
                                }}
                            >
                                Machine
                            </button>
                        </Link>
                        <Link to="/S_home">
                            <button
                                className="bg-white text-black font-bold py-2 px-4 rounded mr-4 hover:bg-gray-200"
                                style={{
                                    animation: 'fadeIn 0.5s ease forwards',
                                    transition: 'transform 0.3s ease'
                                }}
                            >
                                Supplier
                            </button>
                        </Link>
                        <Link to="/O_home">
                            <button
                                className="bg-white text-black font-bold py-2 px-4 rounded mr-4 hover:bg-gray-200"
                                style={{
                                    animation: 'fadeIn 0.5s ease forwards',
                                    transition: 'transform 0.3s ease'
                                }}
                            >
                                Order
                            </button>
                        </Link>
                        <Link to="/V_home">
                            <button
                                className="bg-white text-black font-bold py-2 px-4 rounded mr-4 hover:bg-gray-200"
                                style={{
                                    animation: 'fadeIn 0.5s ease forwards',
                                    transition: 'transform 0.3s ease'
                                }}
                            >
                                Vehicle
                            </button>
                        </Link>
                        
                        
                        <Link to="/Py_home">
                            <button
                                className="bg-white text-black font-bold py-2 px-4 rounded mr-4 hover:bg-gray-200"
                                style={{
                                    animation: 'fadeIn 0.5s ease forwards',
                                    transition: 'transform 0.3s ease'
                                }}
                            >
                                Payments
                            </button>
                        </Link>
                        <Link to="/E_home">
                            <button
                                className="bg-white text-black font-bold py-2 px-4 rounded mr-4 hover:bg-gray-200"
                                style={{
                                    animation: 'fadeIn 0.5s ease forwards',
                                    transition: 'transform 0.3s ease'
                                }}
                            >
                                employee
                            </button>
                        </Link>
                        <Link to="/login">
                            <button
                                className="bg-white text-black font-bold py-2 px-4 rounded mr-4 hover:bg-gray-200"
                                style={{
                                    animation: 'fadeIn 0.5s ease forwards',
                                    transition: 'transform 0.3s ease'
                                }}
                            >
                                login
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
                        
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
