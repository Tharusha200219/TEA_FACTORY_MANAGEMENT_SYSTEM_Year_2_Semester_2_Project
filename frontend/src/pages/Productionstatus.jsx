import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const Productionstatus = () => {
    const [loading, setLoading] = useState(false);
    const [pendingProductions, setPendingProductions] = useState([]);
    const [finishedProductions, setFinishedProductions] = useState([]);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/productions')
            .then((response) => {
                const allProductions = response.data.data;
                const pending = allProductions.filter(prod => prod.Status === 'not done');
                const finished = allProductions.filter(prod => prod.Status === 'done');
                setPendingProductions(pending);
                setFinishedProductions(finished);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    const renderProductionTable = (productions, type) => {
        return (
            <div className="p-4">
                <h2 className='text-2xl font-bold text-gray-800 mb-2'>{type === 'pending' ? 'Pending Schedules' : 'Finished Schedules'}</h2>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Schedule No</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Production Date</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Quantity</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Machine Assignment</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Shift Information</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {productions.map((production, index) => (
                                    <tr key={index} className='h-8'>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Schedule_no}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Production_date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Machine_assignment}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.shift_information}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    };

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
                        <Link to="/Productionmachineavailability" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
                        <Link to="/ProductionReport" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Report Generate</Link>
                        <Link to="/Productionstatus" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Status</Link>
                        <Link to="/user-profile-page" className="absolute right-10 flex  space-x-2">
                    <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                    
                </Link>
                    </div>
                </div>
            </nav>

            {/* Pending Schedules Table */}
            {renderProductionTable(pendingProductions, 'pending')}

            {/* Finished Schedules Table */}
            {renderProductionTable(finishedProductions, 'finished')}

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default Productionstatus;
