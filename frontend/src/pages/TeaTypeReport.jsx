import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TeaTypeReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/teatypes') // Adjust the API endpoint as needed
            .then((response) => {
                console.log('Response data:', response.data);
                setReportData(response.data.data); // Assuming response.data.data is the array you want to display
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1 style={{ textAlign: 'center', color: '#4CAF50' }}>Tea Type Report</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {/* Display report data */}
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                                <th style={{ padding: '8px', textAlign: 'left' }}>Schedule No</th>
                                <th style={{ padding: '8px', textAlign: 'left' }}>Black Tea</th>
                                <th style={{ padding: '8px', textAlign: 'left' }}>Green Tea</th>
                                <th style={{ padding: '8px', textAlign: 'left' }}>Oolong Tea</th>
                                <th style={{ padding: '8px', textAlign: 'left' }}>White Tea</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(reportData) && reportData.length > 0 ? (
                                reportData.map((teatype) => (
                                    <tr key={teatype._id}>
                                        <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{teatype.Schedule_no}</td>
                                        <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{teatype.black_tea}</td>
                                        <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{teatype.green_tea}</td>
                                        <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{teatype.oolong_tea}</td>
                                        <td style={{ padding: '8px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>{teatype.white_tea}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td style={{ padding: '8px', textAlign: 'center', borderBottom: '1px solid #ddd' }} colSpan="5">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default TeaTypeReport;
