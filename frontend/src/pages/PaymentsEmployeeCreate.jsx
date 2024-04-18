import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const PaymentsEmployeeCreate = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [amount, setAmount] = useState('');
    const [method, setMethod] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            axios
                .get('http://localhost:5555/employees')
                .then((response) => {
                    setEmployees(response.data.data);
                    setFilteredEmployees(response.data.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setLoading(false);
                });
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    const handleSavePayment = () => {
        const data = {
            employeeId,
            amount,
            method,
            startDate,
            endDate,
        };
        console.log("Data to be sent: ", data);
        setLoading(true);
        axios.post('http://localhost:5555/paymentsEmployee/add', data)
            .then(() => {
                setLoading(false);
                navigate('/PaymentsEmployee');
            })
            .catch((error) => {
                alert('An error occurred');
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <h1 className='text-3xl my-4'>Add New Payment for Employee</h1>

            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Employee</label>
                    <select
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    >
                        <option value="">Select Employee</option>
                        {employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                                {`${employee.employeeName}`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Amount</label>
                    <input
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Method</label>
                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    >
                        <option value="">Select Method</option>
                        <option value="Visa">Visa</option>
                        <option value="Master">Master</option>
                        <option value="PayPal">PayPal</option>
                    </select>
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <div className='p-4'>
                    <label className='text-xl mr-4 text-gray-500'>End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>

                <button className='p-2 bg-sky-300 m-8' onClick={handleSavePayment}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default PaymentsEmployeeCreate;
