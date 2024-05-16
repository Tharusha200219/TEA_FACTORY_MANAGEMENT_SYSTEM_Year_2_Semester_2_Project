import React, { useState } from 'react';
import BackButtonOrder from '../components/backbuttonOrder';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);


  const formik = useFormik({
    initialValues: {
      orderno: '',
      duedate: '',
      quantity: '',
      category: '',
      name: '',
      address: '',
      telephone: '',
    },
    validationSchema: Yup.object().shape({
      orderno: Yup.number().required('Order No is required').positive('Order No must be positive'),
      duedate: Yup.date().required('Due Date is required'),
      quantity: Yup.number()
        .required('Quantity is required')
        .positive('Quantity must be positive')
        .min(1000, 'Quantity must be at least 1000')
        .max(10000, 'Quantity must be at most 10000'),
      category: Yup.string().required('Category is required'),
      name: Yup.string()
        .required('Name is required')
        .min(5, 'Name must be at least 5 characters')
        .max(15, 'Name must be at most 15 characters'),
      address: Yup.string().required('Address is required').max(75, 'Address must be at most 75 characters'),
      telephone: Yup.string()
        .required('Telephone is required')
        .matches(/^\d{10}$/, 'Telephone must be a 10 digit number'),
    }),

    onSubmit: (values) => {
      handleSaveOrder(values);
    },
  });

  const handleSaveOrder = (values) => {
    setLoading(true);

    const { orderno, duedate, quantity, category, name, address, telephone } = values;
    const requestData = { orderno, duedate, quantity, category, name, address, telephone };

    axios.post(`http://localhost:5555/orders`, requestData)
      .then(() => {
        setLoading(false);
        navigate('/OrderHome');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButtonOrder />
      <h1 className='text-3xl my-4'>Create Order</h1>

      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <form onSubmit={formik.handleSubmit}>
          <div className='p-4'>
            <label className='text-xl mr-4 text-gray-500'>Order No</label>
            <input
              type="text"
              name="orderno"
              value={formik.values.orderno}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onKeyDown={(e) => {
                const inputValue = e.target.value;
                const keyPressed = e.key;
                if (keyPressed === 'Backspace') {
                  return;
                }
                if (inputValue === '' && keyPressed === '0') {
                  e.preventDefault();
                  return;
                }

                if (!/^[0-9]$/.test(keyPressed)) {
                  e.preventDefault();
                }
              }}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
            {formik.touched.orderno && formik.errors.orderno ? (
              <div className="text-red-500">{formik.errors.orderno}</div>
            ) : null}
          </div>

  

          <div className='p-4'>
            <label className='text-xl mr-4 text-gray-500'>DueDate</label>
            <input
              type="date"
              name="duedate"
              value={formik.values.duedate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              min={tomorrow.toISOString().split('T')[0]}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
            {formik.touched.duedate && formik.errors.duedate ? (
              <div className="text-red-500">{formik.errors.duedate}</div>
            ) : null}
          </div>

          <div className='p-4'>
            <label className='text-xl mr-4 text-gray-500'>Quantity</label>
            <input
              type="text"
              name="quantity"
              value={formik.values.quantity}
              onChange={(e) => {
                const value = e.target.value;
                if (!/^\d*$/.test(value)) return;
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              className='border-2 border-gray-500 px-4 py-2 w-full'
              maxLength="5"
            />
            {formik.touched.quantity && formik.errors.quantity ? (
              <div className="text-red-500">{formik.errors.quantity}</div>
            ) : null}
          </div>


          <div className='p-4'>
            <label className='text-xl mr-4 text-gray-500'>Category</label>
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            >
              <option value=""></option>
              <option value="whitetea">whitetea</option>
              <option value="blacktea">blacktea</option>
              <option value="ooblongtea">ooblongtea</option>
              <option value="greentea">greentea</option>
            </select>
            {formik.touched.category && formik.errors.category ? (
              <div className="text-red-500">{formik.errors.category}</div>
            ) : null}
          </div>

          <div className='p-4'>
            <label className='text-xl mr-4 text-gray-500'>Name</label>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border-2 border-gray-500 px-4 py-2 w-full'
              pattern="[A-Za-z]{5,15}"

            />
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-500">{formik.errors.name}</div>
            ) : null}
          </div>

          <div className='p-4'>
            <label className='text-xl mr-4 text-gray-500'>Address</label>
            <input
              type="text"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border-2 border-gray-500 px-4 py-2 w-full'
              maxLength="75"

            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500">{formik.errors.address}</div>
            ) : null}
          </div>

          <div className='p-4'>
            <label className='text-xl mr-4 text-gray-500'>Telephone</label>
            <input
              type="text"
              name="telephone"
              value={formik.values.telephone}
              onChange={(e) => {
                const value = e.target.value;
                if (!/^\d*$/.test(value)) return;
                if (value.length > 10) return;
                formik.handleChange(e);
              }}
              onBlur={formik.handleBlur}
              className='border-2 border-gray-500 px-4 py-2 w-full'
              maxLength="10"
            />
            {formik.touched.telephone && formik.errors.telephone ? (
              <div className="text-red-500">{formik.errors.telephone}</div>
            ) : null}
          </div>

          <button type="submit" className='p-2 bg-sky-300 m-8'>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrder;
