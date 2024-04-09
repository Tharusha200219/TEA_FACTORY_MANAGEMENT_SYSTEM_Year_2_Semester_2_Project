import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import Spinner from '../components/Spinner';
import { useParams } from 'react-router-dom';
import SupplierSearch from '../components/SupplierSearch';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';

const SupplierHome = () => {
    const [suppliers, setSuppliers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState('name'); 
    const [filteredSuppliers, setFilteredSuppliers] = useState([]); 
    const tableRef = useRef();

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5555/suppliers')
            .then((response) => {
                setSuppliers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    //search function
    useEffect(() => {
        handleSearch(); 
    }, [searchInput, searchType]);

    const handleSearch = () => {
        if (searchInput.trim() === '') {
            setFilteredSuppliers([]);
        } else {
            const filtered = suppliers.filter(supplier => {
                if (searchType === 'id') {
                    return supplier.supplierid.toLowerCase().includes(searchInput.toLowerCase());
                } else if (searchType === 'name') {
                    return supplier.name.toLowerCase().includes(searchInput.toLowerCase());
                }
                return false;
            });
            setFilteredSuppliers(filtered);
        }
    };

    const downloadPDF = () => {
        try {
            const doc = new jsPDF();
            const tableData = suppliers.map(supplier => [supplier.supplierid, supplier.name, supplier.address, supplier.contact, supplier.email]);
    
            doc.setFontSize(16);
            const topic = 'Suppliers Report';
            const topicX = 15;
            const topicY = 15;

            doc.text(topic, topicX, topicY);
    
            doc.autoTable({
                head: [['Supplier id', 'Name', 'Address', 'ContactNo', 'Email']],
                body: tableData,
                margin: { top: 25 }, 
                columnStyles: {
                    0: { cellWidth: 30 } 
                }
            });

            doc.save('Supplier Report.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };    
    
    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            {/* Navigation Bar */}
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div className="text-white text-xl font-bold">
                            Ever Green Tea
                        </div>
                        <div className="flex space-x-4">
                            <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/SupplierHome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Suppliers</Link>
                            <Link to="/SupplyRecordTable" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Supply Records</Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className='p-16' style={{ paddingBottom: '100px' }}>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800'>Supplier Table</h1>
                    <div className="flex items-center">
                        <button onClick={downloadPDF} className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all'>
                            Generate Report
                        </button>
                        <Link
                            to='/suppliers/create'
                            className='bg-green-950 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-all flex items-center ml-4'>
                            Add New
                        </Link>
                    </div>
                </div>

                {/* SupplierSearch component */}
                <SupplierSearch
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    searchType={searchType}
                    setSearchType={setSearchType}
                    // handleButtonClick={handleButtonClick}
                    showSearchType={true}
                />

                {/* show filtered or all suppliers */}
                {loading ? (
                    <Spinner />
                ) : (
                    <div id="pdf-content" ref={tableRef}>
                        <table className='w-full border-collapse border border-gray-300 '>
                            <thead className='bg-gray-200'>
                                <tr>
                                    <th className='border border-gray-300 p-4 text-left'>SUPPLIER ID</th>
                                    <th className='border border-gray-300 p-4 text-left'>NAME</th>
                                    <th className='border border-gray-300 p-4 text-left'>ADDRESS</th>
                                    <th className='border border-gray-300 p-4 text-left'>CONTACT NO</th>
                                    <th className='border border-gray-300 p-4 text-left'>EMAIL</th>
                                    <th className='border border-gray-300 p-4 text-left'>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(filteredSuppliers.length > 0 ? filteredSuppliers : suppliers).map((item, index) => (
                                    <tr key={item._id} className='border border-gray-300'>
                                        <td className='border border-gray-300 p-4'>{item.supplierid}</td>
                                        <td className='border border-gray-300 p-4'>{item.name}</td>
                                        <td className='border border-gray-300 p-4'>{item.address}</td>
                                        <td className='border border-gray-300 p-4'>{item.contact}</td>
                                        <td className='border border-gray-300 p-4'>{item.email}</td>
                                        <td className='border border-gray-300 p-4'>
                                            <div className='flex justify-center gap-x-4'>
                                                <Link to={`/suppliers/details/${item._id}`} >
                                                    <BsInfoCircle className='text-2xl text-green-800'/>
                                                </Link>
                                                <Link to={`/suppliers/edit/${item._id}`} >
                                                    <AiOutlineEdit className='text-2xl text-yellow-600'/>
                                                </Link>
                                                <Link to={`/suppliers/delete/${item._id}`} >
                                                    <MdOutlineDelete className='text-2xl text-red-600'/>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

             {/* Footer */}
             <footer style={{ backgroundColor: '#3FC060', position: 'absolute', bottom: 0, left: 0, right: 0 }} className="text-white py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <p>&copy; 1998-{new Date().getFullYear()} Ever Green Tea Factory. All rights reserved.</p>
                        <p>Contact: 0112787678</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default SupplierHome;
