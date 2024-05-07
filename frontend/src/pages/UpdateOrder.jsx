import React, { useState, useEffect } from 'react';
import BackButtonOrder from '../components/backbuttonOrder';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const UpdateOrder = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      orderno: '',
      duedate: '',
      quantity: '',
      category: '',
      address: '',
      telephone: '',
    },
    validationSchema: Yup.object().shape({
      orderno: Yup.number().required('Order No is required').min(0, 'Order No must be positive'),
      duedate: Yup.date().required('Due Date is required'),
      quantity: Yup.number().required('Quantity is required').min(0, 'Quantity must be positive'),
      category: Yup.string().required('Category is required'),
      address: Yup.string().required('address is required'),
      telephone: Yup.string().required('telephone is required'),
    }),
    onSubmit: (values) => {
      handleUpdateOrder(values);
    },
  });

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/orders/${id}`)
      .then((response) => {
        formik.setValues({
          orderno: response.data.orderno,
          duedate: response.data.duedate,
          quantity: response.data.quantity,
          category: response.data.category,
          address: response.data.address,
          telephone: response.data.telephone,
        });
        setLoading(false);
      }).catch((error) => {
        setLoading(false);
        alert('An error happened. Please check console');
        console.log(error);
      });
  }, []);

  const handleUpdateOrder = (values) => {
    setLoading(true);
    axios.put(`http://localhost:5555/orders/${id}`, values)
      .then(() => {
        setLoading(false);
        navigate('/OrderHome');
      })
      .catch((error) => {
        setLoading(false);
        alert('An error occurred');
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <BackButtonOrder />
      <h1 className='text-3xl my-4'>Update Order</h1>

      {loading ? <Spinner /> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <form onSubmit={formik.handleSubmit}>
          <div className='p-4'>
            <label className='text-xl mr-4 text-gray-500'>Order No</label>
            <input
              type="number"
              name="orderno"
              value={formik.values.orderno}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
            {formik.touched.duedate && formik.errors.duedate ? (
              <div className="text-red-500">{formik.errors.duedate}</div>
            ) : null}
          </div>

          <div className='p-4'>
            <label className='text-xl mr-4 text-gray-500'>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formik.values.quantity}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border-2 border-gray-500 px-4 py-2 w-full'
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
              <option value="whitetea">White Tea</option>
              <option value="blacktea">Black Tea</option>
              <option value="ooblongtea">Oolong Tea</option>
              <option value="greentea">Green Tea</option>
            </select>
            {formik.touched.category && formik.errors.category ? (
              <div className="text-red-500">{formik.errors.category}</div>
            ) : null}
          </div>

          <div className='p-4'>
            <label className='text-xl mr-4 text-gray-500'>Address</label>
            <input
              type="String"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border-2 border-gray-500 px-4 py-2 w-full'
            />
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500">{formik.errors.address}</div>
            ) : null}
          </div>

          <div className='p-4'>
            <label className='text-xl mr-4 text-gray-500'>Telephone</label>
            <input
              type="String"
              name="telephone"
              value={formik.values.telephone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className='border-2 border-gray-500 px-4 py-2 w-full'
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

export default UpdateOrder;
