import React, { useState } from 'react';
import axios from 'axios';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    employeeName: '',
    employeeEmail: '',
    employeeMobile: '',
    employeeAddress: '',
    employeeRoles: '',
    sendEmailChecked: false // Checkbox state
  });

  const [sentEmails, setSentEmails] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5555/employees', formData);
      console.log(res.data);
      
      // Update table with newly added employee
      setSentEmails([...sentEmails, {...formData, emailSendOn: new Date().toLocaleString()}]);
      
      // Send email if checkbox is checked
      if (formData.sendEmailChecked) {
        const emailRes = await axios.post('http://localhost:5555/send-email', {
          employeeName: formData.employeeName,
          employeeEmail: formData.employeeEmail
          // Add more data if required
        });
        console.log(emailRes.data);
      }

      // Clear form data after submission
      setFormData({
        employeeName: '',
        employeeEmail: '',
        employeeMobile: '',
        employeeAddress: '',
        employeeRoles: '',
        sendEmailChecked: false
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className='text-3xl mb-4 text-center'>Send Invitation to Log into System</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="employeeName" className="text-gray-600">Name:</label>
          <input type="text" id="employeeName" name="employeeName" value={formData.employeeName} onChange={handleChange} required className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="employeeEmail" className="text-gray-600">Email:</label>
          <input type="text" id="employeeEmail" name="employeeEmail" value={formData.employeeEmail} onChange={handleChange} required className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="employeeRoles" className="text-gray-600">Position:</label>
          <input type="text" id="employeeRoles" name="employeeRoles" value={formData.employeeRoles} onChange={handleChange} required className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" />
        </div>
        {/* Other input fields 
        <div className="flex items-center">
          <input type="checkbox" id="sendEmailChecked" name="sendEmailChecked" checked={formData.sendEmailChecked} onChange={() => setFormData({...formData, sendEmailChecked: !formData.sendEmailChecked})} className="mr-2" />
          <label htmlFor="sendEmailChecked" className="text-gray-600">Send Email</label>
        </div>*/}
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
        </div>
      </form>


      {/* Table for displaying sent emails */}
      <h2 className='text-2xl mt-8 text-center'>Sent Emails List</h2>
      <table className="w-full mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Position</th>
            <th className="py-2">Email Send On</th>
            {/* Add more table headers if required */}
          </tr>
        </thead>
        <tbody>
          {sentEmails.map((email, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
              <td className="py-2">{email.employeeName}</td>
              <td className="py-2">{email.employeeEmail}</td>
              {/* Add more table data if required */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailForm;
