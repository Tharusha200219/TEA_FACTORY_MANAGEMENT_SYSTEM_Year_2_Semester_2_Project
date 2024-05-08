import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DeleteTeaLeavesEntry = () => {
    const { id } = useParams(); // Extract the id from URL params

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.delete(`http://localhost:5555/teaLeaves2/${id}`);
            alert('Tea leaves entry deleted successfully!');
            window.location.href = '/Rawtealeaves2'; // Redirect to Rawtealeaves2 page after successful deletion
        } catch (error) {
            console.error('Error deleting tea leaves entry:', error);
            alert('Failed to delete tea leaves entry. Please try again.');
        }
    };

    return (
        <div className="container">
            <h2 className="text-center text-2xl font-bold mt-8 mb-4">Delete Tea Leaves Entry</h2>
            <form onSubmit={handleSubmit} className="form w-1/2 mx-auto">
                <p className="text-center mb-4">Are you sure you want to delete this tea leaves entry?</p>
                <div className="flex justify-center">
                    <button type="submit" className="btn bg-red-500 text-white hover:bg-red-600 px-6 py-2 rounded">Delete</button>
                </div>
            </form>
        </div>
    );
};

export default DeleteTeaLeavesEntry;
