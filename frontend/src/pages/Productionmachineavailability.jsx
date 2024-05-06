import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import NavigationBar from '../components/NavigationBar'; // Import NavigationBar component
import Footer from '../components/Footer';
const MachineHome = () => {
    const [machines, setMachines] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/machines')
            .then((response) => {
                setMachines(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    // Filter machines that are 'Available'
    const availableMachines = machines.filter(machine => machine.Status === 'Available');

    return (
        <div>
            {/* Navigation Bar */}
            <NavigationBar />
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto flex justify-center items-center">
                    <div className="flex space-x-4">
                        <Link to="/P_home" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/Productionhome" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Productions</Link>
                        <Link to="/productions/creates" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                        <Link to="/Productionmachineavailability" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
                        <Link to="/ProductionReport" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Report Generate</Link>
                        <Link to="/Productionstatus" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Status</Link>
                        <Link to="/user-profile-page" className="absolute right-10 flex  space-x-2">
                    <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                
                </Link>
                    </div>
                </div>
            </nav>
            <div className='p-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-2xl my-8'>Available Machines List</h1> 
                    
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>machineNumber</th> 
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>machineName</th> 
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {availableMachines.map((machine, index) => (
                                    <tr key={machine._id} className='h-10'> 
                                        <td className='px-4 py-4 whitespace-nowrap'>{machine.machineNumber}</td> 
                                        <td className='px-4 py-4 whitespace-nowrap'>{machine.machineName}</td> 
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            
<Footer />
        </div>
    
    );
    
}


export default MachineHome;
