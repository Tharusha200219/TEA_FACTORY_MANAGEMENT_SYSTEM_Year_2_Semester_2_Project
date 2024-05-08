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
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import companyLogo from '/images/logo.png';

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

    //report generate function
    const downloadPDF = () => {
        try {
            const doc = new jsPDF();
            const pageWidth = doc.internal.pageSize.getWidth();
    
            const logoWidth = 20;
            const logoHeight = 20;
            const logoX = 15;
            const logoY = 10;
    
            doc.addImage(companyLogo, 'PNG', logoX, logoY, logoWidth, logoHeight);
    
            doc.setFontSize(16);
            const topic = 'Suppliers Report';
            const topicWidth = doc.getTextWidth(topic);
            const topicX = (pageWidth - topicWidth) / 2;
            const topicY = logoY + logoHeight + 5;
    
            doc.text(topic, topicX, topicY);
    
            const tableData = suppliers.map(supplier => [
                supplier.supplierid,
                supplier.name,
                supplier.address,
                supplier.contact,
                supplier.email,
            ]);
    
            doc.autoTable({
                head: [['Supplier ID', 'Name', 'Address', 'Contact No', 'Email']],
                body: tableData,
                margin: { top: topicY + 10 },
                columnStyles: {
                    0: { cellWidth: 30 },
                },
            });
    
            const finalY = doc.autoTable.previous.finalY;
            const signatureX = 15;
            const signatureY = finalY + 30;
    
            doc.setFontSize(12);
            doc.text('.....................', signatureX, signatureY);
            doc.text('Authorized Signature', signatureX, signatureY + 5);
    
            doc.save('Suppliers Report.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };    
    
    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <NavigationBar />
            <nav style={{ backgroundColor: '#3FC060' }} className="p-4">
              <div className="container mx-auto flex justify-center items-center">
                    <div className="flex space-x-4">
                            <Link to="/" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
                            <Link to="/SupplierHome" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Suppliers</Link>
                            <Link to="/SupplyRecordTable" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Supply Records</Link>
                            <Link to="/user-profile-page" className="absolute right-10 flex  space-x-2">
                             <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" /></Link>
                    </div>
              </div>
            </nav>

            <div className='p-16' style={{ paddingBottom: '100px' }}>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800'>Supplier List</h1>
                    <div className="flex items-center">
                        <button onClick={downloadPDF} 
                         className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all'>
                            Generate Report
                        </button>
                        <Link
                            to='/suppliers/create'
                            className='bg-green-950 text-white py-2 px-4 rounded hover:bg-yellow-600 transition-all flex items-center ml-4'>
                            Add New
                        </Link>
                    </div>
                </div>

                <SupplierSearch
                    searchInput={searchInput}
                    setSearchInput={setSearchInput}
                    searchType={searchType}
                    setSearchType={setSearchType}
                    showSearchType={true}
                />

                {loading ? (
                    <Spinner />
                ) : (
                    <>
                      {searchInput.trim() !== '' && filteredSuppliers.length === 0 ? (
                       <p>No results found.</p>
                    ) : (
                    <div id="pdf-content" ref={tableRef}>
                        <div className="overflow-x-auto">
                        <table className='min-w-full divide-y divide-gray-200'>
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th className='px-6 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>SUPPLIER ID</th>
                                    <th className='px-6 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>NAME</th>
                                    <th className='px-6 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>ADDRESS</th>
                                    <th className='px-6 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>CONTACT NO</th>
                                    <th className='px-6 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>EMAIL</th>
                                    <th className='pl-9 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(filteredSuppliers.length > 0 ? filteredSuppliers : suppliers).map((item, index) => (
                                    <tr key={item._id} className='border border-gray-300'>
                                        <td className='px-6 py-4 border border-gray-300'>{item.supplierid}</td>
                                        <td className='px-6 py-4 border border-gray-300 capitalize'>{item.name}</td>
                                        <td className='px-6 py-4 border border-gray-300 capitalize'>{item.address}</td>
                                        <td className='px-6 py-4 border border-gray-300'>{item.contact}</td>
                                        <td className='px-6 py-4 border border-gray-300'>{item.email}</td>
                                        <td className='px-6 py-4 border border-gray-300'>
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
                    </div>
                )}
            </>
        )}
        </div>
            <Footer />
        </div>
    );
}

export default SupplierHome;
