import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import NavigationBar from '../components/NavigationBar';

const MaintenanceReport = () => {
    const [maintenances, setMaintenances] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setLoading(true);
        axios
            .get('http://localhost:5555/maintenances')
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
        const input = document.getElementById('maintenance-table');

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', 'a1');
            const imgWidth = 841; // A1 width in mm
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            // Add title to the PDF
            pdf.setFontSize(30);
            pdf.setTextColor(0, 0, 0); // Black color
            pdf.text("Maintenance Report", imgWidth / 2, 15, { align: "center" });

            pdf.addImage(imgData, 'PNG', 0, 30, imgWidth, imgHeight); // Adjust the Y position to make space for the title
            pdf.save('maintenance_report.pdf');
        });
    };

    return (
        <div>
            {/* Navigation Bar */}
            <NavigationBar />

            {/* Main Content */}
            <div className='p-4'>
                <h1 className='text-4xl my-8 text-center'>Maintenance Report</h1>
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
                        <table id="maintenance-table" className='min-w-full divide-y divide-gray-200 text-sm'>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className='px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider'>Machine Number</th>
                                    <th className='px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider'>Machine Name</th>
                                    <th className='px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider'>Description</th>
                                    <th className='px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider'>Maintenance Date</th>
                                    <th className='px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider'>Frequency in Days</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredMaintenances.map((maintenance, index) => (
                                    <tr key={maintenance._id}>
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

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-4 mt-8">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <p>&copy; 1998-{new Date().getFullYear()} Ever Green Tea Factory. All rights reserved.</p>
                        <p>Contact: 0112787678</p>
                    </div>
                    <div>
                        {/* Add any additional footer content here */}
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default MaintenanceReport;