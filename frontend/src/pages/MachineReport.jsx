import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import companyLogo from '/images/logo.png'; // Make sure to replace this with the correct path to your logo image

const MachineReport = () => {
    const [machines, setMachines] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:5555/machines')
            .then((response) => {
                setMachines(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const formatDate = (date) => {
        const formattedDate = new Date(date);
        return formattedDate.toISOString().split('T')[0];
    };

    const generatePDF = () => {
        const doc = new jsPDF('landscape', 'mm', 'a4');

        // Company Logo and Title
        const img = new Image();
        img.src = companyLogo;
        doc.addImage(img, 'PNG', 10, 10, 40, 40);
        doc.setTextColor(22, 160, 133); // Set text color to green
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('EVER GREEN TEA', 55, 30);
        
        // Title and header
        doc.setFontSize(22);
        doc.text('Machine Report', 148.5, 50, { align: 'center' });

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);

        // Table headers and data
        const data = machines.map(machine => [
            machine.machineNumber,
            machine.machineName,
            machine.machineType,
            formatDate(machine.installationDate),
            machine.warrentyInformation,
            machine.Status
        ]);

        doc.autoTable({
            startY: 60,
            head: [['Machine Number', 'Machine Name', 'Machine Type', 'Installation Date', 'Warranty Information', 'Status']],
            body: data,
            theme: 'grid',
            headStyles: { fillColor: [22, 160, 133], textColor: [255, 255, 255], fontStyle: 'bold' },
            alternateRowStyles: { fillColor: [245, 245, 245] }
        });

        // Manager Signature and Date
        doc.setFontSize(13);
        doc.setTextColor(0, 0, 0); // Set text color back to black
        doc.text('Manager Signature: ________________________', 10, doc.lastAutoTable.finalY + 30);
        doc.text(`Date: ${new Date().toISOString().split('T')[0]}`, doc.internal.pageSize.width - 40, doc.lastAutoTable.finalY + 30, { align: 'right' });

        return doc;
    };

    const handleDownloadPdf = () => {
        const doc = generatePDF();
        doc.save('machine_report.pdf');
    };

    return (
        <div className="flex flex-col min-h-screen">
            <NavigationBar />
            <nav className="bg-green-500 p-4">
                <div className="container mx-auto flex justify-center">
                    <div className="flex space-x-4">
                        <Link to="/M_home" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/MachineHome" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Machines</Link>
                        <Link to="/machines/creates" className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Create Machine</Link>
                        <Link to="/MachineReport" className="text-white bg-gray-900 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Machine Report</Link>
                        <Link to="/user-profile-page" className="absolute right-10 flex space-x-2">
                            <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
                        </Link>
                    </div>
                </div>
            </nav>
            
            <div className="flex justify-between items-center p-4">
                <h1 className="text-3xl font-bold">Machine Report</h1>
                <button onClick={handleDownloadPdf} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">
                    Download PDF
                </button>
            </div>
            
            <div className="flex-grow p-4">
                <div id="machine-table" className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Machine Number</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Machine Name</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Machine Type</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Installation Date</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Warranty Information</th>
                                <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {machines.map(machine => (
                                <tr key={machine._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{machine.machineNumber}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{machine.machineName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{machine.machineType}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{formatDate(machine.installationDate)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{machine.warrentyInformation}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{machine.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            
            {/* Add the footer at the bottom of the page */}
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default MachineReport;
