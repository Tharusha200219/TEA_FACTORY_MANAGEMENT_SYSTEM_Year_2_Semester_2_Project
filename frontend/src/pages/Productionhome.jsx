import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationBar from '../components/NavigationBar';

const Productionhome = () => {
    const [productions, setProductions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/productions')
            .then((response) => {
                // Remove T00:00:00.000Z from the date and format it as YYYY-MM-DD
                const formattedProductions = response.data.data.map(prod => ({
                    ...prod,
                    Production_date: new Date(prod.Production_date).toISOString().split('T')[0]
                }));
                setProductions(formattedProductions);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setProductions(prevProductions => {
                return prevProductions.map(prod => {
                    if (prod.timerRunning && prod.remainingTime > 0) {
                        return { ...prod, remainingTime: prod.remainingTime - 1 };
                    } else if (prod.timerRunning && prod.remainingTime === 0) {
                        return { ...prod, timerRunning: false };
                    }
                    return prod;
                });
            });
        }, 1000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []);

    const handleTimerChange = (index, value) => {
        setProductions(prevProductions => {
            const updatedProductions = [...prevProductions];
            updatedProductions[index].timerDurationInSeconds = parseInt(value);
            return updatedProductions;
        });
    };

    const handleStartTimer = (index) => {
        setProductions(prevProductions => {
            const updatedProductions = [...prevProductions];
            updatedProductions[index].timerRunning = true;
            updatedProductions[index].remainingTime = updatedProductions[index].timerDurationInSeconds;
            return updatedProductions;
        });
    };

    useEffect(() => {
        // Filter productions with timer running out
        const productionsToUpdate = productions.filter(prod => prod.timerRunning && prod.remainingTime === 0);

        // Update the database for each production
        productionsToUpdate.forEach(prod => {
            axios.put(`http://localhost:5555/productions/${prod._id}`, { ...prod, Status: "done" })
                .then(response => {
                    console.log("Production updated successfully:", response.data);
                    // Notify user
                    notify(prod.Schedule_no);
                })
                .catch(error => {
                    console.log("Error updating production:", error);
                });
        });
    }, [productions]);

    const notify = (scheduleNo) => {
        toast(`Schedule No ${scheduleNo} production is done!`, { autoClose: 5000 });
    };

    const Timer = ({ remainingTime }) => {
        return <span>{remainingTime}</span>;
    };

    // Filter productions based on search term
    const filteredProductions = productions.filter(production => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        // Check if search term matches any field or if it's a number matching Schedule_no
        return (
            (typeof production.Schedule_no === 'string' && production.Schedule_no.toLowerCase().includes(searchTermLowerCase)) ||
            (typeof production.Production_date === 'string' && production.Production_date.toLowerCase().includes(searchTermLowerCase)) ||
            (typeof production.Quantity === 'string' && production.Quantity.toString().toLowerCase().includes(searchTermLowerCase)) ||
            (typeof production.Machine_assignment === 'string' && production.Machine_assignment.toLowerCase().includes(searchTermLowerCase)) ||
            (typeof production.shift_information === 'string' && production.shift_information.toLowerCase().includes(searchTermLowerCase)) ||
            (typeof production.Status === 'string' && production.Status.toLowerCase().includes(searchTermLowerCase)) ||
            (typeof production.Schedule_no === 'number' && production.Schedule_no === parseInt(searchTermLowerCase))
        );
    });

    return (
        <div>
            {/* Navigation Bar */}
            <NavigationBar />
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto flex justify-center items-center">
                    <div className="flex space-x-4">
                        <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/Productionhome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Productions</Link>
                        <Link to="/productions/creates" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                        <Link to="/Productionmachineavailability" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
                        <Link to="/ProductionReport" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Report Generate</Link>
                        <Link to="/Productionstatus" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Status</Link>
                    </div>
                </div>
            </nav>


            {/* Search Input */}
            <div className="px-4 py-2">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
            </div>

            {/* Table */}
            <div className='p-4'>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className='min-w-full divide-y divide-gray-200'>
                            {/* Table header */}
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine Assignment</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift Information</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timer (seconds)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            {/* Table body */}
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredProductions.map((production, index) => (
                                    <tr key={index} className='h-8'>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Schedule_no}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Production_date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Machine_assignment}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.shift_information}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <input
                                                type="number"
                                                value={production.timerDurationInSeconds}
                                                onChange={(e) => handleTimerChange(index, e.target.value)}
                                                className="border rounded-md px-2 py-1 focus:outline-none focus:ring focus:border-blue-300"
                                            />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className='flex justify-center gap-x-4'>
                                                <button onClick={() => handleStartTimer(index)} className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">Start Timer</button>
                                                <Timer remainingTime={production.remainingTime} />
                                                <Link to={`/productions/details/${production._id}`}>
                                                    <BsInfoCircle className='text-2xl text-green-800' />
                                                </Link>
                                                <Link to={`/productions/edit/${production._id}`}>
                                                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                                                </Link>
                                                <Link to={`/productions/delete/${production._id}`}>
                                                    <MdOutlineDelete className='text-2xl text-red-600' />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer style={{ backgroundColor: '#3FC060' }} className="text-white py-4 mt-8">
                {/* Footer content */}
            </footer>

            {/* Toast Container for Notifications */}
            <ToastContainer position="bottom-right" />
        </div>
    );
}

export default Productionhome;
