import React, { useEffect, useState, useRef} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import SupplierSearch from '../components/SupplierSearch';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import companyLogo from '/images/logo.png';

const SupplyRecordTable = () => {
    const [supplyrecords, setSupplyRecords] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState(''); 
    const [filterdSupplyRecords, setfilterdSupplyRecords] = useState([]);
    const tableRef = useRef();
 
    useEffect(() => {
        getSupplyRecords();
    }, []);

    const getSupplyRecords = async () => {
        setLoading(true);
        axios.get('http://localhost:5555/supplyrecords')
            .then((response) => {
                const formattedRecords = response.data.map(record => ({
                    ...record,
                    date: record.date.split('T')[0] 
                }));
                setSupplyRecords(formattedRecords); 
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });

    };

    //search function
    useEffect(() => {
        handleSearch(); 
    }, [searchInput, searchType]);

    const handleSearch = () => {
        if (searchInput.trim() === '') {
            setfilterdSupplyRecords([]);
        } else {
            const filtered = supplyrecords.filter(record => {
               return record.supplier.toLowerCase().includes(searchInput.toLowerCase()); 
            });
            setfilterdSupplyRecords(filtered);
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
            const topic = 'Supply Records Report';
            const topicWidth = doc.getTextWidth(topic);
            const topicX = (pageWidth - topicWidth) / 2;
            const topicY = logoY + logoHeight + 5;
    
            doc.text(topic, topicX, topicY);
    
            const tableData = supplyrecords.map(supplyrecord => [
                supplyrecord.supplier,
                supplyrecord.date,
                supplyrecord.quantity,
                supplyrecord.unitPrice,
            ]);
    
            doc.autoTable({
                head: [['Supplier', 'Date', 'Quantity', 'UnitPrice']],
                body: tableData,
                margin: { top: topicY + 10 },
            });
    
            const finalY = doc.autoTable.previous.finalY;
            const signatureX = 15;
            const signatureY = finalY + 50;
    
            doc.setFontSize(12);
            doc.text('....................', signatureX, signatureY);
            doc.text('Authorized Signature', signatureX, signatureY + 5);
    
            doc.save('Supply Report.pdf');
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
                        <Link to="/SupplierHome" className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Suppliers</Link>
                        <Link to="/SupplyRecordTable" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Supply Records</Link>
                        <Link to="/user-profile-page" className="absolute right-10 flex  space-x-2">
                          <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" /></Link>
                    </div>
                </div>
            </nav>

            <div className='p-16' style={{ paddingBottom: '100px' }}>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800'>Supply Record List</h1>
                    <div className="flex items-center">
                        <button onClick={downloadPDF} className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-all'>
                            Generate Report
                        </button>
                        <Link
                            to='/supplyrecords/create'
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
                    showSearchType={false}
                />

                {loading ? (
                    <Spinner />
                ) : (
                    <>
                      {searchInput.trim() !== '' && filterdSupplyRecords.length === 0 ? (
                       <p>No results found.</p>
                    ) : (
                    <div id="pdf-content" ref={tableRef}>
                        <table className='w-full border-collapse border border-gray-300'>
                            <thead className='bg-gray-50'>
                                <tr>
                                    <th className='pl-6 py-3 pr-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>SUPPLIER</th>
                                    <th className='px-6 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>SUPPLY DATE</th>
                                    <th className='pl-6 py-3 pr-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>RAW QUANTITY (KG)</th>
                                    <th className='px-6 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>UNIT PRICE</th>
                                    <th className='px-6 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>COST</th>
                                    <th className='px-6 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>STATUS</th>
                                    <th className='pl-9 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>ACTIONS</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {(filterdSupplyRecords.length > 0 ? filterdSupplyRecords : supplyrecords).map((item, index) => ( 
                                    <tr key={item._id} className='border border-gray-300'>
                                        <td className='px-6 py-4 border border-gray-300'>{item.supplier}</td>
                                        <td className='px-6 py-4 border border-gray-300'>{item.date}</td>
                                        <td className='px-6 py-4 border border-gray-300'>{item.quantity}</td>
                                        <td className='px-6 py-4 border border-gray-300'>{item.unitPrice}</td>
                                        <td className='px-6 py-4 border border-gray-300'>{item.quantity * item.unitPrice}</td>
                                        <td className='px-6 py-4 border border-gray-300'>
                                        {item.status === 'Pending' ? 
                                        <span class="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2.5 py-1.5 rounded dark:text-blue-400 border border-blue-400">{item.status}</span>
                                         :
                                         <span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-1.5 rounded dark:bg-green-900 dark:text-green-300">{item.status}</span>
                                         }
                                         </td>
                                        <td className='px-6 py-4 border border-gray-300'>
                                            <div className='flex justify-center gap-x-4'>
                                                <Link to={`/supplyrecords/details/${item._id}`} >
                                                    <BsInfoCircle className='text-2xl text-green-800'/>
                                                </Link>
                                                
                                                {item.status === 'Pending' ? (
                                                <Link to={`/supplyrecords/edit/${item._id}`} >
                                                    <AiOutlineEdit className= "text-2xl text-yellow-600"/>
                                                </Link>
                                                ) : (
                                                    <span className="text-2xl text-gray-400 cursor-not-allowed">
                                                    <AiOutlineEdit />
                                                    </span>
                                                )}

                                                {item.status === 'Pending' ? (
                                                <Link to={`/supplyrecords/delete/${item._id}`}>
                                                    <MdOutlineDelete className="text-2xl text-red-600" />
                                                </Link>
                                                ) : (
                                                    <span className="text-2xl text-gray-400 cursor-not-allowed">
                                                        <MdOutlineDelete />
                                                    </span>
                                                )}

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
             </>
            )}
        </div>
         <Footer />
        </div>
    );
}

export default SupplyRecordTable;
