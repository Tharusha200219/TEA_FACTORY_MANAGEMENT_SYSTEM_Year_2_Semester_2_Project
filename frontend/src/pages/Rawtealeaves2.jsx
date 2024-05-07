import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RetrieveTeaLeavesEntries = () => {
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response = await axios.get('http://localhost:5555/teaLeaves2');
                setEntries(response.data);
            } catch (error) {
                console.error('Error fetching tea leaves entries:', error);
            }
        };
        fetchEntries();
    }, []);

    const handleConsume = async (id) => {
        try {
            await axios.put(`http://localhost:5555/teaLeaves2/${id}`, { status: 'consumed' });
            const updatedEntries = entries.map(entry => {
                if (entry._id === id) {
                    return { ...entry, status: 'consumed' };
                }
                return entry;
            });
            setEntries(updatedEntries);
            alert('Tea leaves entry status updated to "consumed" successfully!');
        } catch (error) {
            console.error('Error updating tea leaves entry status:', error);
            alert('Failed to update tea leaves entry status. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5555/teaLeaves2/${id}`);
            const updatedEntries = entries.filter(entry => entry._id !== id);
            setEntries(updatedEntries);
            alert('Tea leaves entry deleted successfully!');
        } catch (error) {
            console.error('Error deleting tea leaves entry:', error);
            alert('Failed to delete tea leaves entry. Please try again.');
        }
    };

    return (
        <div className="container" style={{ backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
            <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#333' }}>Tea Leaves Entries</h2>
            <Link to="/Irawleaves" className="btn btn-primary" style={{ background: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>Back</Link>
            <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ borderBottom: '1px solid #000', padding: '10px' }}>Quantity</th>
                        <th style={{ borderBottom: '1px solid #000', padding: '10px' }}>Date</th>
                        <th style={{ borderBottom: '1px solid #000', padding: '10px' }}>Status</th>
                        <th style={{ borderBottom: '1px solid #000', padding: '10px' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map(entry => (
                        <tr key={entry._id}>
                            <td style={{ border: '1px solid #000', padding: '10px' }}>{entry.quantity}</td>
                            <td style={{ border: '1px solid #000', padding: '10px' }}>{entry.date}</td>
                            <td style={{ border: '1px solid #000', padding: '10px' }}>{entry.status}</td>
                            <td style={{ border: '1px solid #000', padding: '10px' }}>
                                <Link to={`/Rawtealeaves2/edit/${entry._id}`} className={`btn btn-secondary ${entry.status === 'consumed' ? 'disabled' : ''}`} style={{ marginRight: '10px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', textDecoration: 'none', display: 'inline-block' }}>Edit</Link>
                                <button onClick={() => handleConsume(entry._id)} disabled={entry.status === 'consumed'} className="btn btn-warning" style={{ background: '#f1c40f', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', textDecoration: 'none', display: 'inline-block' }}>Consume</button>
                                <button onClick={() => handleDelete(entry._id)} className="btn btn-danger" style={{ background: '#f44336', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', textDecoration: 'none', display: 'inline-block', marginLeft: '10px' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Link to="/Rawtealeaves2create" className="btn btn-primary" style={{ background: '#008CBA', color: 'white', border: 'none', borderRadius: '5px', padding: '10px 20px', textDecoration: 'none', display: 'inline-block' }}>Add New Tea Leaves Entry</Link>
            </div>
        </div>
    );
};

export default RetrieveTeaLeavesEntries;
