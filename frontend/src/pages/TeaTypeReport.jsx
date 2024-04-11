import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import NavigationBar from '../components/NavigationBar'; // Import NavigationBar component
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Footer from '../components/Footer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    section: {
        flexGrow: 1
    },
    header: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: 10,
        fontSize: 18,
        marginBottom: 10,
        textAlign: 'center',
    },
    table: {
        width: '100%',
        border: '1px solid #ddd',
        borderCollapse: 'collapse',
        marginTop: 20,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottom: '1px solid #ddd',
    },
    tableColHeader: {
        width: '20%',
        padding: '12px',
        textAlign: 'center',
        borderRight: '1px solid #ddd',
        backgroundColor: '#4CAF50',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tableCol: {
        width: '20%',
        padding: '12px',
        textAlign: 'center',
        borderRight: '1px solid #ddd',
        fontSize: 14,
    },
});

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

    const generatePDF = () => (
        <Document>
            <Page size="A1" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.header}>Tea Type Report</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Schedule No</Text>
                            <Text style={styles.tableColHeader}>Black Tea</Text>
                            <Text style={styles.tableColHeader}>Green Tea</Text>
                            <Text style={styles.tableColHeader}>Oolong Tea</Text>
                            <Text style={styles.tableColHeader}>White Tea</Text>
                        </View>
                        {reportData.map((teatype) => (
                            <View key={teatype._id} style={styles.tableRow}>
                                <Text style={styles.tableCol}>{teatype.Schedule_no}</Text>
                                <Text style={styles.tableCol}>{teatype.black_tea}</Text>
                                <Text style={styles.tableCol}>{teatype.green_tea}</Text>
                                <Text style={styles.tableCol}>{teatype.oolong_tea}</Text>
                                <Text style={styles.tableCol}>{teatype.white_tea}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Page>
        </Document>
    );

    return (
        <div>
            <NavigationBar />
            {/* Navigation Bar */}
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto">
                    <div className=" mx-auto flex justify-center items-center">
                        
                        <div className="flex space-x-4">
                            <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/Teatypehome" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tea Type</Link>
                            <Link to="/teatypes/creates" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                            <Link to="/pending-shipments" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
                            <Link to="/TeaTypeReport" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Tea Type Report Generate</Link>
                            <Link to="/user-profile-page" className="absolute right-10 flex  space-x-2">
                    <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                    {/* You can replace "example-profile-image.jpg" with the actual path to your user profile image */}
                </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div>
                <h1 style={{ textAlign: 'center', color: '#000000', fontSize: 24, marginTop: 20 }}>Tea Type Report</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        {/* Display PDF Download Link */}
                        <PDFDownloadLink
                            document={generatePDF()}
                            fileName="tea_type_report.pdf"
                            style={{
                                textDecoration: 'none',
                                padding: '10px',
                                color: '#FFF',
                                backgroundColor: '#000000',
                                borderRadius: '5px',
                                display: 'inline-block',
                                marginBottom: '20px',
                                marginTop: '20px',
                                marginLeft: '10px',
                            }}
                        >
                            {({ loading }) =>
                                loading ? 'Loading document...' : 'Download Tea Type Report PDF'
                            }
                        </PDFDownloadLink>

                        {/* Display report data */}
                        <div style={{ maxWidth: '100%', margin: 'auto', overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#000000', color: 'white' }}>
                                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd', width: '20%' }}>Schedule No</th>
                                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd', width: '20%' }}>Black Tea</th>
                                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd', width: '20%' }}>Green Tea</th>
                                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd', width: '20%' }}>Oolong Tea</th>
                                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd', width: '20%' }}>White Tea</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(reportData) && reportData.length > 0 ? (
                                        reportData.map((teatype) => (
                                            <tr key={teatype._id} style={{ backgroundColor: '#f2f2f2' }}>
                                                <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{teatype.Schedule_no}</td>
                                                <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{teatype.black_tea}</td>
                                                <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{teatype.green_tea}</td>
                                                <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{teatype.oolong_tea}</td>
                                                <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{teatype.white_tea}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }} colSpan="5">No data available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default TeaTypeReport;
