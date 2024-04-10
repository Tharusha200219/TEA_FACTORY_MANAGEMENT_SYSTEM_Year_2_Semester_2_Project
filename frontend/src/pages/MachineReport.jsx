import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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

    const handleDownloadPdf = () => {
        const input = document.getElementById('machine-table');

        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('landscape', 'mm', 'a1');
            const imgWidth = 841;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.setFontSize(30);
            pdf.setTextColor(0, 0, 0);
            pdf.text("Machine Report", imgWidth / 2, 15, { align: "center" });

            pdf.addImage(imgData, 'PNG', 0, 30, imgWidth, imgHeight);
            pdf.save('machine_report.pdf');
        });
    };

    return (
        <div>
            <NavigationBar />
            <nav className="bg-green-500 p-4"> 
                <div className="container mx-auto flex justify-center">
                    <div className="flex space-x-4">
                        <Link to="/" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                        <Link to="/MachineHome" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">machines</Link>
                        <Link to="/machines/creates" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">create table</Link>
                        <Link to="/pending-shipments" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Availability </Link>
                        <Link to="/MachineReport" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">machine report generate  </Link>
                    </div>
                </div>
            </nav>
            <div className="flex justify-between items-center p-4">
                <h1 className="text-2xl">Machine Report</h1>
                <button onClick={handleDownloadPdf} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Download PDF
                </button>
            </div>
            <div className="p-4">
                <div className="overflow-x-auto" id="machine-table">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">machineNumber</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">machineName</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">machineType</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">installationDate</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">warrentyInformation</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {machines.map((machine) => (
                                <tr key={machine._id} className="h-10">
                                    <td className="px-4 py-4 whitespace-nowrap">{machine.machineNumber}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{machine.machineName}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{machine.machineType}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{machine.installationDate}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{machine.warrentyInformation}</td>
                                    <td className="px-4 py-4 whitespace-nowrap">{machine.Status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MachineReport;
