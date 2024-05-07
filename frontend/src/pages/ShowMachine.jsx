import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Spinner from '../components/Spinner';
import Footer from '../components/Footer';

const ShowMachine = () => {
    const [machine, setMachine] = useState({});
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5555/machines/${id}`)
            .then(response => {
                setMachine(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, [id]);

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toLocaleDateString();
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavigationBar />

            {/* Additional Navigation Bar */}
            <nav className="bg-green-500 p-4">
                <div className="container mx-auto flex justify-center">
                    <div className="flex space-x-4">
                        <Link to="/M_home" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/MachineHome" className="text-white bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Machines</Link>
                        <Link to="/machines/creates" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Machine</Link>
                        <Link to="/MachineReport" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Machine Report</Link>
                        <Link to="/user-profile-page" className="absolute right-10 flex space-x-2">
                            <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                        </Link>
                    </div>
                </div>
            </nav>

            <div className="container mx-auto py-6 flex-grow">
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="bg-white p-6 rounded shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Machine Details</h2>
                        <div className="space-y-4">
                            <div><strong>ID:</strong> {machine._id}</div>
                            <div><strong>Machine Number:</strong> {machine.machineNumber}</div>
                            <div><strong>Machine Name:</strong> {machine.machineName}</div>
                            <div><strong>Machine Type:</strong> {machine.machineType}</div>
                            <div><strong>Installation Date:</strong> {formatDate(machine.installationDate)}</div>
                            <div><strong>Warranty Information:</strong> {machine.warrentyInformation}</div>
                            <div><strong>Created At:</strong> {formatDate(machine.createdAt)}</div>
                            <div><strong>Updated At:</strong> {formatDate(machine.updatedAt)}</div>
                        </div>

                        {/* Add Back button */}
                        <div className="mt-6">
                            <Link to="/MachineHome" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Back
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default ShowMachine;