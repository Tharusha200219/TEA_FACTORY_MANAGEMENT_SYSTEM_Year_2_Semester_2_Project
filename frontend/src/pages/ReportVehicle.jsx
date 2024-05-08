import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import NavigationBar from '../components/NavigationBar';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    section: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: '#3AC056',
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
        width: '25%',
        padding: '12px',
        textAlign: 'center',
        borderRight: '1px solid #ddd',
        backgroundColor: '#3AC056',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tableCol: {
        width: '25%',
        padding: '12px',
        textAlign: 'center',
        borderRight: '1px solid #ddd',
        fontSize: 14,
    },
    logo: {
        width: 100,
        height: 100,
        top:-2,
        marginTop: 10,
        left: 800,
        justifyContent: 'center',
        alignItems: 'center',

    },
    signature: {
        width: 150,
        height: 50,
        marginTop: 20,
        position: 'absolute',
        right: 80,
        top: 500,
    },
    date: {
        textAlign: 'left',
        marginTop: 20,
        position: 'absolute',
        left: 40,
        top: 500,
    },
});

const VehicleReport = () => {
    const [reportData, setReportData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/vehicles') // Adjust the API endpoint as needed
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
                    <View style={styles.logo}>
                        <Image src="/images/logo.png" style={{ width: 100 }} />
                        <Text style={styles.companyName}>EVER GREEN TEA</Text>
                    </View>
                    <Text style={styles.header}>Vehicle Report</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>No</Text>
                            <Text style={styles.tableColHeader}>Type</Text>
                            <Text style={styles.tableColHeader}>Reg_Num</Text>
                            <Text style={styles.tableColHeader}>Added Year</Text>
                        </View>
                        {reportData.map((vehicle, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCol}>{index + 1}</Text>
                                <Text style={styles.tableCol}>{vehicle.Type}</Text>
                                <Text style={styles.tableCol}>{vehicle.RegNum}</Text>
                                <Text style={styles.tableCol}>{vehicle.AddedYear}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.signature}>
                        <Text>..........................................</Text>
                        <Text>Signature</Text>
                    </View>
                    <View style={styles.date}>
                        <Text>Date:.......................</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );

    return (
        <div>
            <NavigationBar />
            <nav style={{ backgroundColor: '#3AC056' }} className="p-4">
                <div className="container mx-auto">
                    <div className=" mx-auto flex justify-center items-center">
                        <div className="flex space-x-4">
                            <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/vehicles/create" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add New Vehicle</Link>
                            <Link to="/vehicle-report" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Vehicle Report Generate</Link>
                            <Link to="/orders" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">View Orders</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div>
                <h1 style={{ textAlign: 'center', color: '#000000', fontSize: 24, marginTop: 20 }}>Vehicle Report</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <PDFDownloadLink
                            document={generatePDF()}
                            fileName="vehicle_report.pdf"
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
                                loading ? 'Loading document...' : 'Download Vehicle Report PDF'
                            }
                        </PDFDownloadLink>

                        <div style={{ maxWidth: '100%', margin: 'auto', overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#3AC056', color: 'white' }}>
                                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd', width: '25%' }}>No</th>
                                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd', width: '25%' }}>Type</th>
                                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd', width: '25%' }}>Reg Num</th>
                                        <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd', width: '25%' }}>Added Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(reportData) && reportData.length > 0 ? (
                                        reportData.map((vehicle, index) => (
                                            <tr key={index} style={{ backgroundColor: '#f2f2f2' }}>
                                                <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{index + 1}</td>
                                                <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{vehicle.Type}</td>
                                                <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{vehicle.RegNum}</td>
                                                <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>{vehicle.AddedYear}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }} colSpan="4">No data available</td>
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

export default VehicleReport;
