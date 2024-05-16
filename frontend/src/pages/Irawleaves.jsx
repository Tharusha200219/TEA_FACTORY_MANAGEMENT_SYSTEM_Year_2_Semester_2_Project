import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import SupplierSearch from '../components/SupplierSearch';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const SupplyRecordTable = () => {
    const [supplyrecords, setSupplyRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('');
    const [filteredSupplyRecords, setFilteredSupplyRecords] = useState([]);
    const [teaLeavesQuantity, setTeaLeavesQuantity] = useState(() => {
        const savedQuantity = localStorage.getItem('teaLeavesQuantity');
        return savedQuantity ? Number(savedQuantity) : 0;
    });
    const [manualDecreaseAmount, setManualDecreaseAmount] = useState(0);
    const [manualIncreaseAmount, setManualIncreaseAmount] = useState(0);
    const tableRef = useRef();

    useEffect(() => {
        getSupplyRecords();
    }, []);

    const getSupplyRecords = async () => {
        setLoading(true);
        axios.get('http://localhost:5555/supplyrecords')
            .then((response) => {
                const formattedRecords = response.data.map(record => ({
                    ...record,
                    date: record.date.split('T')[0] 
                }));
                setSupplyRecords(formattedRecords); 
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:5555/teaLeaves')
            .then((response) => {
                const quantity = response.data.quantity;
                setTeaLeavesQuantity(quantity);
                localStorage.setItem('teaLeavesQuantity', quantity); // Save quantity to local storage
            })
            .catch((error) => {
                console.error('Error fetching tea leaves quantity:', error);
            });
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchInput, searchType]);

    const handleSearch = () => {
        if (searchInput.trim() === '') {
            setFilteredSupplyRecords([]);
        } else {
            const filtered = supplyrecords.filter(record => {
                return record.supplier.toLowerCase().includes(searchInput.toLowerCase());
            });
            setFilteredSupplyRecords(filtered);
        }
    };

    const handleAccept = (record) => {
        axios.put('http://localhost:5555/teaLeaves/increment', { incrementAmount: record.quantity })
            .then((response) => {
                setTeaLeavesQuantity(prevQuantity => prevQuantity + record.quantity);
                localStorage.setItem('teaLeavesQuantity', teaLeavesQuantity + record.quantity); // Update local storage
                handleRecordStatus(record._id);
            })
            .catch((error) => {
                console.error('Error updating tea leaves quantity:', error);
            });
    };

    const handleRecordStatus = async (recordId) => {
        try {
            const response = await axios.put(`http://localhost:5555/supplyrecords/changeStatus/${recordId}`, { status: 'Inventory' });
            console.log(response);
            if(response.status){
                getSupplyRecords();
            }
        } catch (error) {
            console.error(error);
        } 
    };

    const handleManualDecrease = () => {
        if (manualDecreaseAmount <= teaLeavesQuantity) {
            const newQuantity = teaLeavesQuantity - manualDecreaseAmount;
            setTeaLeavesQuantity(newQuantity);
            localStorage.setItem('teaLeavesQuantity', newQuantity);
            setManualDecreaseAmount(0);
        } else {
            alert('Cannot decrease more than current quantity');
        }
    };

    const handleManualIncrease = () => {
        const newQuantity = teaLeavesQuantity + manualIncreaseAmount;
        setTeaLeavesQuantity(newQuantity);
        localStorage.setItem('teaLeavesQuantity', newQuantity);
        setManualIncreaseAmount(0);
    };

    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <NavigationBar />
            <nav className="bg-green-500 p-4">
                <div className="container mx-auto flex justify-center">
                    <div className="flex space-x-4">
                        <Link to="/HomePage" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/inventorys" className="text-white  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">inventory</Link>
                        <Link to="/waste-management" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Waste Management</Link>
                        <Link to="/Pendingshipmentss" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pending Shipments</Link>
                       <Link to="/Irawleaves" className="text-white bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Raw Leaves Management</Link>
                    </div>
                </div>
            </nav>
            <div className='p-16' style={{ paddingBottom: '100px' }}>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800'>Supply Record Table</h1>
                    <div className="flex items-center">
                        <p className="text-gray-600">Tea Leaves Quantity: {loading ? 'Loading...' : teaLeavesQuantity}</p>
                        <div>
                            <input className='ml-3' type="number" value={manualDecreaseAmount} onChange={(e) => setManualDecreaseAmount(parseInt(e.target.value))} />
                            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 ml-3' onClick={handleManualDecrease}>Decrease</button>
                        </div>
                        <div>
                            <input className='ml-3' type="number" value={manualIncreaseAmount} onChange={(e) => setManualIncreaseAmount(parseInt(e.target.value))} />
                            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 ml-3' onClick={handleManualIncrease}>Increase</button>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <Spinner />
                ) : (
                    <div id="pdf-content" ref={tableRef}>
                        <table className='w-full border-collapse border border-gray-300'>
                            <thead className='bg-gray-200'>
                                <tr>
                                    <th className='border border-gray-300 p-4 text-left'>SUPPLIER</th>
                                    <th className='border border-gray-300 p-4 text-left'>SUPPLY DATE</th>
                                    <th className='border border-gray-300 p-4 text-left'>QUANTITY (KG)</th>
                                    <th className='border border-gray-300 p-4 text-left'>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(filteredSupplyRecords.length > 0 ? filteredSupplyRecords : supplyrecords).map((item, index) => ( 
                                    <tr key={item._id} className='border border-gray-300'>
                                        <td className='px-6 py-4 border border-gray-300'>{item.supplier}</td>
                                        <td className='px-6 py-4 border border-gray-300'>{item.date}</td>
                                        <td className='px-6 py-4 border border-gray-300'>{item.quantity}</td>
                                        <td className='px-6 py-4 border border-gray-300'>
                                            <div className='flex justify-center gap-x-4'>
                                                <button disabled={item.status === 'Inventory'} className={item.status === 'Pending' ? "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" : "bg-gray-500 text-white font-bold py-2 px-4 rounded"} onClick={() => handleAccept(item)}>Accept</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="flex justify-center mt-8">
                    <Link to="/Rawtealeaves2" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Send to Production</Link>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default SupplyRecordTable;
