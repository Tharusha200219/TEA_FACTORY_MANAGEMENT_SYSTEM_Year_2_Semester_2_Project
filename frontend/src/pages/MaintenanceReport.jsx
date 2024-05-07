import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importing the jsPDF autoTable plugin
import companyLogo from '/images/logo.png'; // Import your company logo

const MaintenanceReport = () => {
    const [maintenances, setMaintenances] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/maintenances')
            .then((response) => {
                setMaintenances(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    // Function to handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter maintenances based on search query
    const filteredMaintenances = maintenances.filter((maintenance) => {
        return Object.values(maintenance).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const handleDownloadPdf = () => {
        // Create a new jsPDF instance
        const pdf = new jsPDF('landscape', 'mm', 'a4'); // Landscape orientation and A4 size
        
        // Add company logo
        const imgData = companyLogo;
        pdf.addImage(imgData, 'PNG', 10, 10, 40, 40);

        // Set text color to ubber green
        pdf.setTextColor(22, 160, 133);

        // Add main title "EVER GREEN TEA" with ubber green color
        pdf.setFontSize(20);
        pdf.text("EVER GREEN TEA", pdf.internal.pageSize.width / 2, 20, { align: "center" });

        // Add title "Maintenance Report" with ubber green color
        pdf.setFontSize(20);
        pdf.text("Maintenance Report", pdf.internal.pageSize.width / 2, 40, { align: "center" });

        // Set text color back to black
        pdf.setTextColor(0);

        // Add current date
        const date = new Date().toLocaleDateString();
        pdf.setFontSize(10);
        pdf.text(`Date: ${date}`, pdf.internal.pageSize.width - 30, 20, { align: "right" });
        
        // Convert the maintenance data to a format suitable for jsPDF autoTable
        const headers = [['Machine Number', 'Machine Name', 'Description', 'Maintenance Date', 'Frequency in Days']];
        const data = filteredMaintenances.map((maintenance) => ([
            maintenance.machineNumber,
            maintenance.machineName,
            maintenance.description,
            maintenance.maintenanceDate,
            maintenance.frequencyInDays,
        ]));

        // Use the autoTable function to create the table
        pdf.autoTable({
            head: headers,
            body: data,
            startY: 50, // Start the table a little below the title, company logo, and date
            styles: {
                fontSize: 10,
                cellPadding: 4,
                font: 'helvetica',
            },
            headStyles: {
                fillColor: [230, 230, 230], // Light gray background for header
                textColor: [0, 0, 0], // Black text color
                fontStyle: 'bold',
            },
        });

        // Manager Signature and Date
        pdf.setFontSize(12);
        pdf.text('Manager Signature: ________________________', 10, pdf.lastAutoTable.finalY + 30);
        pdf.text(`Date: ${date}`, pdf.internal.pageSize.width - 30, pdf.lastAutoTable.finalY + 30, { align: "right" });

        // Save the PDF document
        pdf.save('maintenance_report.pdf');
    };

    return (
        <div>
            <NavigationBar />

            {/* Navigation Bar */}
            <nav className="bg-green-500 p-4">
                <div className="container mx-auto flex justify-center">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-4">
                            <Link to="/M_home" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/MaintenanceHome" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenances</Link>
                            <Link to="/maintenances/creates" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">create table</Link>
                            <Link to="/MaintenanceAvailability" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Availability</Link>
                            <Link to="/MaintenanceReport" className="text-white bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Maintenance Report Generate</Link>
                            <Link to="/user-profile-page" className="absolute right-10 flex space-x-2">
                            <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                        </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className='p-4'>
                <h1 className='text-3xl my-4 text-center'>Maintenance Report</h1>

                {/* Search Bar and Download PDF button */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-4">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="border border-gray-300 rounded-md px-3 py-1 mb-2 lg:mb-0"
                    />
                    <button onClick={handleDownloadPdf} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Download PDF
                    </button>
                </div>

                {loading ? (
                    <Spinner />
                ) : (
                    <div className="overflow-x-auto">
                        <table id="maintenance-table" className='min-w-full divide-y divide-gray-200 bg-white rounded-md shadow'>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Machine Number</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Machine Name</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Description</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Maintenance Date</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Frequency in Days</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredMaintenances.map((maintenance, index) => (
                                    <tr key={maintenance._id} className='hover:bg-gray-100'>
                                        <td className='px-6 py-4 whitespace-nowrap'>{maintenance.machineNumber}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{maintenance.machineName}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{maintenance.description}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{maintenance.maintenanceDate}</td>
                                        <td className='px-6 py-4 whitespace-nowrap'>{maintenance.frequencyInDays}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default MaintenanceReport;
