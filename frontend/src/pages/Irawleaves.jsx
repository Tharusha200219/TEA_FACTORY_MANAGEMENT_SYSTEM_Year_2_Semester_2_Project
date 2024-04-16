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

const SupplyRecordTable = () => {
    const [supplyrecords, setSupplyRecords] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [searchType, setSearchType] = useState(''); 
    const [filterdSupplyRecords, setfilterdSupplyRecords] = useState([]);
    const tableRef = useRef();
 
    useEffect(() => {
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
    }, []);

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
            const tableData = supplyrecords.map(supplyrecord => [supplyrecord.supplier, supplyrecord.date, supplyrecord.quantity, supplyrecord.unitPrice ]);
    
            doc.setFontSize(16);
            const topic = 'Supply Records Report';
            const topicX = 15; 
            const topicY = 15; 
    
            doc.text(topic, topicX, topicY);

            doc.autoTable({
                head: [['Supplier', 'Date', 'Quantity', 'UnitPrice']],
                body: tableData,
                margin: { top: 25 }, 
                columnStyles: {
                    0: { cellWidth: 'auto' } 
                }
            });
            
            doc.save('Supply Report.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    }; 
    
    return (
        <div style={{ minHeight: '100vh', position: 'relative' }}>
            <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-white text-xl font-bold">
              Ever Green Tea
            </div>
            <div className="flex space-x-4">
              <Link to="/HomePage" className="text-gray-300  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link to="/inventorys" className="text-gray-300   hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">inventory</Link>
              
              
              <Link to="/waste-management" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Waste Management</Link>
              
              <Link to="/pending-shipments" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pending Shipments</Link>
              <Link to="/pending-new-stocks" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Pending New Stocks</Link>
              <Link to="/Irawleaves" className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Raw Leaves Management</Link>
             
            </div>
          </div>
        </div>
      </nav>

            <div className='p-16' style={{ paddingBottom: '100px' }}>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800'>Supply Record Table</h1>
                    <div className="flex items-center">
  

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
                    <div id="pdf-content" ref={tableRef}>
                        <table className='w-full border-collapse border border-gray-300'>
                            <thead className='bg-gray-200'>
                                <tr>
                                    <th className='px-6 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>SUPPLIER</th>
                                    <th className='px-6 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>SUPPLY DATE</th>
                                    <th className='px-6 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>QUANTITY (KG)</th>
                                    <th className='px-6 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>UNIT PRICE</th>
                                    <th className='px-6 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>COST</th>
                                    <th className='px-6 py-3 text-sm font-medium border border-gray-300 text-left text-white  bg-black'>ACTIONS</th>
                                    
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
                                            <div className='flex justify-center gap-x-4'>
 
                                            </div>
                                        </td>
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
}

export default SupplyRecordTable;
