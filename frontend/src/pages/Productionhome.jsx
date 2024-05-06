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
import Footer from '../components/Footer';

const Productionhome = () => {
    const [productions, setProductions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchColumn, setSearchColumn] = useState('Schedule_no');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/productions')
            .then((response) => {
                const formattedProductions = response.data.data.map(prod => ({
                    ...prod,
                    Production_date: new Date(prod.Production_date).toISOString().split('T')[0],
                    timerRunning: false,
                    remainingTime: prod.timerDurationInSeconds
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
        const productionsToUpdate = productions.filter(prod => prod.timerRunning && prod.remainingTime === 0);

        productionsToUpdate.forEach(prod => {
            axios.put(`http://localhost:5555/productions/${prod._id}`, { ...prod, Status: "done" })
                .then(response => {
                    console.log("Production updated successfully:", response.data);
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

    const handleSearchColumnChange = (e) => {
        setSearchColumn(e.target.value);
    };

    const filteredProductions = productions.filter(production => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        const columnValue = production[searchColumn];
        
        if (typeof columnValue === 'string') {
            return columnValue.toLowerCase().includes(searchTermLowerCase);
        } else if (typeof columnValue === 'number') {
            return columnValue.toString().toLowerCase().includes(searchTermLowerCase);
        }

        return false;
    });

    return (
        <div>
            <NavigationBar />
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto flex justify-center items-center">
                    <div className="flex space-x-4">
                        <Link to="/P_home" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/Productionhome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Productions</Link>
                        <Link to="/productions/creates" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                        <Link to="/Productionmachineavailability" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
                        <Link to="/ProductionReport" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Report Generate</Link>
                        <Link to="/Productionstatus" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Status</Link>
                        <Link to="/user-profile-page" className="absolute right-10 flex  space-x-2">
                    <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                    
                </Link>
                    </div>
                </div>
            </nav>

            <div className="px-4 py-2 flex justify-start items-center space-x-4">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-4 pr-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                />
                <div className="relative">
                    <select
                        value={searchColumn}
                        onChange={handleSearchColumnChange}
                        className="appearance-none pl-4 pr-8 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    >
                        <option value="Schedule_no">Schedule No</option>
                        <option value="Production_date">Production Date</option>
                        <option value="Quantity">Quantity</option>
                        <option value="Machine_assignment">Machine Assignment</option>
                        <option value="shift_information">Shift Information</option>
                        <option value="Status">Status</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                    </div>
                </div>
            </div>

            <div className='p-4'>
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
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Timer (seconds)</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Actions</th>
                                </tr>
                            </thead>
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
                                                value={production.remainingTime}
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

            <Footer />

            <ToastContainer position="bottom-right" />
        </div>
    );
}

export default Productionhome;
