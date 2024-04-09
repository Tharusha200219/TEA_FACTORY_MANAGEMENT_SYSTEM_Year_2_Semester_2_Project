import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer'; // Import PDF related components
import NavigationBar from '../components/NavigationBar';

// Define styles for PDF
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    header: {
        backgroundColor: '#F0F0F0',
        padding: 10,
        fontSize: 12,
        marginBottom: 10,
        borderBottom: '1px solid #CCCCCC',
    },
    table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableRow: { 
        flexDirection: 'row',
    },
    tableColHeader: {
        width: '16%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        backgroundColor: '#F0F0F0',
        padding: 5,
        wordWrap: 'break-word',
        flexWrap: 'wrap',
        textAlign: 'center',
    },
    tableCol: {
        width: '16%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        padding: 5,
        wordWrap: 'break-word',
        flexWrap: 'wrap',
        textAlign: 'center',
    },
    text: {
        fontSize: 10,
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
                    <Text style={styles.header}>Production Report</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableColHeader}>Schedule No</Text>
                            <Text style={styles.tableColHeader}>Production Date</Text>
                            <Text style={styles.tableColHeader}>Quantity</Text>
                            <Text style={styles.tableColHeader}>Machine Assignment</Text>
                            <Text style={styles.tableColHeader}>Shift Information</Text>
                            <Text style={styles.tableColHeader}>Status</Text>
                        </View>
                        {productions.map((production, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCol}>{production.Schedule_no}</Text>
                                <Text style={styles.tableCol}>{production.Production_date}</Text>
                                <Text style={styles.tableCol}>{production.Quantity}</Text>
                                <Text style={styles.tableCol}>{production.Machine_assignment}</Text>
                                <Text style={styles.tableCol}>{production.shift_information}</Text>
                                <Text style={styles.tableCol}>{production.Status}</Text>
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
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto flex justify-center items-center">
                    <div className="flex space-x-4">
                        <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/Productionhome" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Productions</Link>
                        <Link to="/productions/creates" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Table</Link>
                        <Link to="/Productionmachineavailability" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Machine Availability</Link>
                        <Link to="/ProductionReport" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Report Generate</Link>
                        <Link to="/Productionstatus" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Production Status</Link>
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
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule No</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Machine Assignment</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift Information</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
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
                                        <td className="px-6 py-4 whitespace-nowrap">{production.Status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer style={{ backgroundColor: '#3FC060' }} className="text-white py-4 mt-8">
                {/* Footer content */}
            </footer>
        </div>
    );
}

export default ProductionReport;
