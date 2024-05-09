
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  section: {
    flexGrow: 1,
  },
  header: {
    top: 8,
    backgroundColor: '#3AC056',
    color: 'white',
    padding: 10,
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    top:10,
    width: '100%',
    border: '1px solid #ddd',
    borderCollapse: 'collapse',
    marginTop: 20,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #ddd',
  },
  tableColHeader: {
    width: '14.28%',
    padding: '12px',
    textAlign: 'center',
    borderRight: '1px solid #ddd',
    backgroundColor: '#3AC056',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  tableCol: {
    width: '14.28%',
    padding: '12px',
    textAlign: 'center',
    borderRight: '1px solid #ddd',
    fontSize: 14,
  },
  logo: {
    width: 150,
    height: 150,
    left:750,
    marginTop: -3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyName: {
    textAlign: 'center',
    marginTop: 1,
    fontSize: 16,
  },
  signature: {
    width: 150,
    height: 50,
    marginTop: 20,
    position: 'absolute',
    right: 100,
    top: 900,
  },
  date: {
    textAlign: 'left',
    marginTop: 20,
    position: 'absolute',
    left: 70,
    top: 900,
  },
});

const GenerateRepoEmployee = () => {
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:5555/employees')
      .then((response) => {
        setEmployeeDetails(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
        setLoading(false);
      });
  }, []);

  const generatePDF = () => (
    <Document>
      <Page size="A1" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.logo}>
            <Image src="/images/logo.png" style={{ width: 100 }} />
            <Text style={styles.companyName}>Ever Green Tea</Text>
          </View>
          <Text style={styles.header}>Employee Report</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableColHeader}>No</Text>
              <Text style={styles.tableColHeader}>Employee Name</Text>
              <Text style={styles.tableColHeader}>Email Address</Text>
              <Text style={styles.tableColHeader}>Contact Number</Text>
              <Text style={styles.tableColHeader}>Address</Text>
              <Text style={styles.tableColHeader}>Role</Text>
              <Text style={styles.tableColHeader}>Created On</Text>
            </View>
            {employeeDetails.map((employee, index) => (
              <View key={employee._id} style={styles.tableRow}>
                <Text style={styles.tableCol}>{index + 1}</Text>
                <Text style={styles.tableCol}>{employee.employeeName}</Text>
                <Text style={styles.tableCol}>{employee.employeeEmail}</Text>
                <Text style={styles.tableCol}>{employee.employeeMobile}</Text>
                <Text style={styles.tableCol}>{employee.employeeAddress}</Text>
                <Text style={styles.tableCol}>{employee.employeeRoles}</Text>
                <Text style={styles.tableCol}>
                  {new Date(employee.createdOn).toLocaleString()}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.signature}>
            <Text>..........................................</Text>
            <Text>Signature</Text>
          </View>
          <View style={styles.date}>
            <Text>Date:.......................</Text>
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
            <Link
              to="/"
              className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/EmployeeHome"
              className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Employee List
            </Link>
            <Link
              to="/employees/create"
              className="text-black-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Register Employee
            </Link>
            <Link
              to="/GenerateRepoEmployee"
              className="text-gray-300 bg-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Employee Report
            </Link>
            <Link to="/user-profile-page" className="absolute right-10 flex  space-x-2">
              <img src="/images/user.png" alt="User Profile" className="w-8 h-8 rounded-full" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="p-4">
        <h1 className="text-3xl my-4 ">Employee Report</h1>

        <PDFDownloadLink
          document={generatePDF()}
          fileName="employee_report.pdf"
          style={{
           
            textDecoration: 'none',
            padding: '10px',
            color: '#FFF',
            backgroundColor: '#000000',
            borderRadius: '5px',
            display: 'inline-block',
            marginBottom: '30px',
          }}
        >
          {({ loading }) => (loading ? 'Loading document...' : 'Download Employee Report PDF')}
        </PDFDownloadLink>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div id="employee-table" className="relative">
            <br />
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                    No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                    Employee Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                    Email Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                    Contact Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-black">
                    Created On
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employeeDetails.map((employee, index) => (
                  <tr key={employee._id} className="bg-white">
                    <td className="border px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{employee.employeeName}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{employee.employeeEmail}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{employee.employeeMobile}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{employee.employeeAddress}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">{employee.employeeRoles}</td>
                    <td className="border px-6 py-4 whitespace-nowrap">
                      {new Date(employee.createdOn).toLocaleString()}
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
};

export default GenerateRepoEmployee;