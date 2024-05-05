import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

// Define styles for PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    section: {
        flexGrow: 1,
        textAlign: 'center',
    },
    header: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: 10,
        fontSize: 24,
        marginBottom: 20,
    },
    table: {
        width: '100%',
        border: '1px solid #ddd',
        borderCollapse: 'collapse',
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
    logo: {
        marginBottom: 20,
        alignItems: 'center',
    },
    signature: {
        width: '100%',
        marginTop: 50,
    },
    reportText: {
        fontSize: 14,
        marginBottom: 20,
    },
    companyName: {
        marginTop: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

const ProductionReport = () => {
    const [productions, setProductions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/productions')
            .then((response) => {
                // Remove T00:00:00.000Z from the date and format it as YYYY-MM-DD
                const formattedProductions = response.data.data.map(prod => ({
                    ...prod,
                    Production_date: new Date(prod.Production_date).toISOString().split('T')[0]
                }));
                setProductions(formattedProductions);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    // Function to generate PDF
    const generatePDF = () => (
        <Document>
            <Page size="A1" style={styles.page}>
                <View style={styles.section}>
                    {/* Company Logo and Name */}
                    <View style={styles.logo}>
                        <Image src="/images/logo.png" style={{ width: 150 }} />
                        <Text style={styles.companyName}>EVER GREEN TEA</Text>
                    </View>
                    
                    {/* Production Report Header */}
                    <Text style={styles.header}>Production Report</Text>
                    
                    {/* Production Report Table */}
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Schedule No</Text>
                            <Text style={styles.tableColHeader}>Production Date</Text>
                            <Text style={styles.tableColHeader}>Quantity</Text>
                            <Text style={styles.tableColHeader}>Machine Assignment</Text>
                            <Text style={styles.tableColHeader}>Shift Information</Text>
                            
                        </View>
                        {productions.map((production, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCol}>{production.Schedule_no}</Text>
                                <Text style={styles.tableCol}>{production.Production_date}</Text>
                                <Text style={styles.tableCol}>{production.Quantity}</Text>
                                <Text style={styles.tableCol}>{production.Machine_assignment}</Text>
                                <Text style={styles.tableCol}>{production.shift_information}</Text>
                                
                            </View>
                        ))}
                    </View>
                    
                    {/* Signature and Date */}
                    <View style={styles.signature}>
                        <Text>..........................................</Text>
                        <Text>Authorized Signature</Text>
                    </View>
                    <View style={styles.signature}>
                        <Text>..........................................</Text>
                        <Text>DATE</Text>
                    </View>
                </View>
            </Page>
        </Document>
    );

    return (
        <div>
            <NavigationBar />
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto flex justify-center items-center">
                    <div className="flex space-x-4">
                        <Link to="/P_home" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/Productionhome" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Productions</Link>
                        <Link to="/productions/creates" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                        <Link to="/Productionmachineavailability" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
                        <Link to="/ProductionReport" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Report Generate</Link>
                        <Link to="/Productionstatus" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Status</Link>
                        <Link to="/user-profile-page" className="absolute right-10 flex  space-x-2">
                            <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Report Table */}
            <div className='p-4'>
                <div className="flex justify-end mb-4">
                    {/* PDF Download Link */}
                    <PDFDownloadLink
                        document={generatePDF()}
                        fileName="production_report.pdf"
                        className="bg-black hover:bg-black-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {({ loading }) =>
                            loading ? 'Loading document...' : 'Download Production PDF'
                        }
                    </PDFDownloadLink>
                </div>

                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table className='min-w-full divide-y divide-gray-200'>
                            {/* Table header */}
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Schedule No</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Production Date</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Quantity</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Machine Assignment</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black'>Shift Information</th>

                                </tr>
                            </thead>
                            {/* Table body */}
                            <tbody className="bg-white divide-y divide-gray-200">
                                {productions.map((production, index) => (
                                    <tr key={index} className='h-8'>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Schedule_no}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Production_date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Machine_assignment}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{production.shift_information}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default ProductionReport;
