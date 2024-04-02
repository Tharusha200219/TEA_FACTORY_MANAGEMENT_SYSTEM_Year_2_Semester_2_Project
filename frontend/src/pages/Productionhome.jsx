import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Productionhome = () => {
    const [productions, setProductions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/productions')
            .then((response) => {
                setProductions(response.data.data.map(prod => ({...prod, timerDurationInSeconds: 0, timerRunning: false, remainingTime: 0})));
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
                        return {...prod, remainingTime: prod.remainingTime - 1};
                    } else if (prod.timerRunning && prod.remainingTime === 0) {
                        return {...prod, timerRunning: false};
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

    return (
        <div>
            {/* Navigation Bar */}
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="text-white text-xl font-bold">
                            Ever Green Tea
                        </div>
                        <div className="flex space-x-4">
                            <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/Productionhome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">productions</Link>
                            <Link to="/productions/creates" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">create table</Link>
                            <Link to="/teatypes" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">production machine availability</Link>
                            <Link to="/pending-new-stocks" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">production report genarate</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='p-4'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl my-8'>Production List</h1>
                    <Link to='/productions/creates'>
                        <MdOutlineAddBox className='text-sky-800 text-4xl' />
                    </Link>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Schedule No</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Production Date</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Quantity</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Machine Assignment</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Shift Information</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Timer (seconds)</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {productions.map((production, index) => (
                                    <tr key={production._id} className='h-8'>
                                        <td className='px-6 py-4 whitespace-nowrap'>{production.Schedule_no}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{production.Production_date}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{production.Quantity}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{production.Machine_assignment}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{production.shift_information}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{production.Status}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <input
                                                type="number"
                                                value={production.timerDurationInSeconds}
                                                onChange={(e) => handleTimerChange(index, e.target.value)}
                                            />
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap'>
                                            <div className='flex justify-center gap-x-4'>
                                                <button onClick={() => handleStartTimer(index)}>Start Timer</button>
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
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <p>&copy; 1998-{new Date().getFullYear()} Ever Green Tea Factory. All rights reserved.</p>
                        <p>Contact: 0112787678</p>
                    </div>
                    <div>
                        {/* Add any additional footer content here */}
                    </div>
                </div>
            </footer>

            {/* Toast Container for Notifications */}
            <ToastContainer position="bottom-right" />
        </div>
    );
}

export default Productionhome;
