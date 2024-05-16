import React, { useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const UpdateTeaLeavesEntry = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5555/teaLeaves2/${id}`, { quantity, date, status });
            alert('Tea leaves entry updated successfully!');
            window.location.href = '/Rawtealeaves2'; // Redirect to Rawtealeaves2 page after successful update
        } catch (error) {
            console.error('Error updating tea leaves entry:', error);
            alert('Failed to update tea leaves entry. Please try again.');
        }
    };

    return (
        <div className="container">
            
            <h2 className="text-center text-2xl font-bold mt-8 mb-4">Update Tea Leaves Entry</h2>
            
            <form onSubmit={handleSubmit} className="form w-1/2 mx-auto">
                <div className="mb-4">
                    <label className="block mb-2">Quantity:</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="input" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Status:</label>
                    <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} className="input" required />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="btn bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded">Update</button>
                    <Link to="/Rawtealeaves2" className="btn bg-gray-500 text-white hover:bg-gray-600 px-6 py-2 rounded ml-4">cancel</Link>
                </div>
            </form>
            
        </div>
    );
};

export default UpdateTeaLeavesEntry;
