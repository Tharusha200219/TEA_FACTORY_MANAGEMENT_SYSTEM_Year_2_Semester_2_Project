import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CreateTeaLeavesEntry = () => {
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5555/teaLeaves2', { quantity, date });
            setIsSuccess(true); // Set isSuccess to true after successful creation
        } catch (error) {
            console.error('Error creating tea leaves entry:', error);
            alert('Failed to create tea leaves entry. Please try again.');
        }
    };

    // Render a success message and link to Rawtealeaves2 page if the entry is successfully created
    if (isSuccess) {
        return (
            <div className="container">
                <h2 className="text-center text-green-600 text-2xl font-bold mt-8 mb-4">Tea Leaves Entry created successfully!</h2>
                <div className="flex justify-center">
                    <Link to="/Rawtealeaves2" className="btn bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded">return to home</Link>
                </div>
            </div>
        );
    }

    // Render the form for creating a tea leaves entry
    return (
        <div className="container">
             <Link to="/Rawtealeaves2" className="btn btn-primary" style={{ background: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>Back</Link>
            
            <h2 className="text-center text-2xl font-bold mt-8 mb-4">Create Tea Leaves Entry</h2>
            <form onSubmit={handleSubmit} className="form w-1/2 mx-auto">
                <div className="mb-4">
                    <label className="block mb-2">Quantity:</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="input" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Date:</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" required />
                </div>
          
                <button type="submit" className="btn bg-blue-500 text-white hover:bg-blue-600 px-6 py-2 rounded">Create</button>
            </form>
        </div>
    );
};

export default CreateTeaLeavesEntry;
